/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects';
import { api, history } from '../services';
import * as actions from '../actions';
import { getPosts, getTags, getCategories } from '../reducers/selectors';

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
  console.log(entity);
  console.log(apiFn);
  console.log(id);
  console.log(url);
  yield put( entity.request(id) );
  const {response, error} = yield call(apiFn, url || id);
  if(response)
    yield put( entity.success(id, response) );
  else
    yield put( entity.failure(id, error) );
}

// yeah! we can also bind Generators
export const fetchPosts      = fetchEntity.bind(null, posts, api.fetchPosts);
export const fetchTags       = fetchEntity.bind(null, tags, api.fetchTags);
export const fetchCategories = fetchEntity.bind(null, categories, api.fetchCategories);

// load user unless it is cached
function* loadPosts(filter, params, loadMore) {
  const posts = yield select(getPosts, filter, params);
  console.log(posts);
  if (!Object.keys(posts).length || loadMore) {
    yield call(
      fetchPosts,
      filter,
      params,
      posts.nextPageUrl
    );
  }
}

// load repo unless it is cached
function* loadTags() {
  const tags = yield select(getTags);
  if (!tags)
    yield call(fetchTags);
}

// load repo unless it is cached
function* loadCategories() {
  const categories = yield select(getCategories);
  if (!categories)
    yield call(fetchCategories);
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
    const {filter} = yield take(actions.LOAD_POSTS);
    yield fork(loadPosts, filter);
  }
}

// Fetches data for a Repo: repo data + repo stargazers
function* watchLoadTags() {
  while(true) {
    yield take(actions.LOAD_TAGS);

    yield fork(loadTags);
  }
}

// Fetches data for a Repo: repo data + repo stargazers
function* watchLoadCategories() {
  while(true) {
    yield take(actions.LOAD_CATEGORIES);

    yield fork(loadCategories);
  }
}

export default function* root() {
  yield [
    fork(watchNavigate),
    fork(watchLoadPosts),
    fork(watchLoadTags),
    fork(watchLoadCategories)
  ]
}
