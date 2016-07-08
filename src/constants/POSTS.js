/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects';
import { api } from '../services';
import * as actions from '../actions';
// import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors';

// each entity defines 3 creators { request, success, failure }
const { posts, tags, categories } = actions;

// url for first page
// urls for next pages will be extracted from the successive loadMore* requests
// const firstPageStarredUrl = login => `users/${login}/starred`
// const firstPageStargazersUrl = fullName => `repos/${fullName}/stargazers`


/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, url || id)
  if(response)
    yield put( entity.success(id, response) )
  else
    yield put( entity.failure(id, error) )
}

// yeah! we can also bind Generators
export const fetchPosts      = fetchEntity.bind(null, posts, api.fetchPosts);
export const fetchTags       = fetchEntity.bind(null, tags, api.fetchTags);
export const fetchCategories = fetchEntity.bind(null, categories, api.fetchCategories);

// load user unless it is cached
function* loadPosts(slug, params, loadMore) {
  const user = yield select(getUser, slug, params)
  if (!user || loadMore) {
    yield call(
      fetchPosts,
      slug,
      params,
      fetchPosts.nextPageUrl
    )
  }
}

// load repo unless it is cached
function* loadTags() {
  const tags = yield select(getRepo)
  if (!tags)
    yield call(fetchTags)
}

// load next page of repos starred by this user unless it is cached
function* loadCategories() {
  const categories = yield select(getStarredByUser)
  if (!categories)
    yield call(fetchCategries)
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// trigger router navigation via history
function* watchNavigate() {
  while(true) {
    const {pathname} = yield take(actions.NAVIGATE)
    yield history.push(pathname)
  }
}

// Fetches data for a User : user data + starred repos
function* watchLoadPosts() {
  while(true) {
    const {login, requiredFields = []} = yield take(actions.LOAD_USER_PAGE)

    yield fork(loadUser, login, requiredFields)
    yield fork(loadStarred, login)
  }
}

// Fetches data for a User : user data + starred repos
function* watchLoadTags() {
  while(true) {
    const {login, requiredFields = []} = yield take(actions.LOAD_USER_PAGE)

    yield fork(loadUser, login, requiredFields)
    yield fork(loadStarred, login)
  }
}

// Fetches data for a Repo: repo data + repo stargazers
function* watchLoadCategories() {
  while(true) {
    const {fullName, requiredFields = []} = yield take(actions.LOAD_REPO_PAGE)

    yield fork(loadRepo, fullName, requiredFields)
    yield fork(loadStargazers, fullName)
  }
}

// Fetches more starred repos, use pagination data from getStarredByUser(login)
function* watchLoadMorePosts() {
  while(true) {
    const {login} = yield take(actions.LOAD_MORE_STARRED)
    yield fork(loadStarred, login, true)
  }
}


export default function* root() {
  yield [
    fork(watchNavigate),
    fork(watchLoadPosts),
    fork(watchLoadTags),
    fork(watchLoadCategories),
    fork(watchLoadMorePosts)
  ]
}
