import { REQUEST, SUCCESS, FAILURE } from '../constants';
export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE'
export const NAVIGATE =  'NAVIGATE'
export const LOAD_MORE_POSTS = 'LOAD_MORE_STARRED'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const POSTS = createRequestTypes('POSTS');
export const TAGS = createRequestTypes('TAGS');
export const CATEGORIES = createRequestTypes('CATEGORIES');

function action(type, payload = {}) {
  return { type, ...payload };
}

export const posts = {
  request: (slug, params) => action(POSTS.REQUEST, {slug, params}),
  success: (slug, params, response) => action(POSTS.SUCCESS, {slug, params, response}),
  failure: (slug, params, error) => action(POSTS.FAILURE, {slug, params, error})
};

export const tags = {
  request: () => action(POSTS.REQUEST),
  success: (response) => action(POSTS.SUCCESS, {response}),
  failure: (error) => action(POSTS.FAILURE, {error})
};

export const categories = {
  request: () => action(POSTS.REQUEST),
  success: (response) => action(POSTS.SUCCESS, {response}),
  failure: (error) => action(POSTS.FAILURE, {error})
};

export const updateRouterState = state => action(UPDATE_ROUTER_STATE, {state})
export const navigate = pathname => action(NAVIGATE, {pathname})
export const loadMorePosts = (params) => action(LOAD_MORE_POSTS, {params})

export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE)
