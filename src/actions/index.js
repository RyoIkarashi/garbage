import fetch from 'isomorphic-fetch'

export const FILTER_CLEAN = 'FILTER_CLEAN';
export const FILTER_SLUG = 'FILTER_SLUG';
export const FILTER_CATEGORY = 'FILTER_CATEGORY';
export const FILTER_TAG = 'FILTER_TAG';
export const FILTER_SEARCH = 'FILTER_SEARCH'

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';

export const filterClean = () => {
  return {
    type: FILTER_CLEAN
  };
};

export const filterSlug = (slug) => {
  return {
    type: FILTER_SLUG,
    slug
  };
};

// for categories
export const filterCategory = (category) => {
  return {
    type: FILTER_CATEGORY,
    category
  };
};

// for tags
export const filterTag = (tag) => {
  return {
    type: FILTER_TAG,
    tag
  };
};

// for search
export const filterSearch = (search) => {
  return {
    type: FILTER_SEARCH,
    search
  };
};

// request posts
const requestPosts = (filter) => {
  return {
    type: REQUEST_POSTS,
    filter
  };
};

// receive posts
const receivePosts = (filter, json) => {
  return {
    type: RECEIVE_POSTS,
    filter,
    posts: json.map(item => item)
  };
};

// fetch single post
export const fetchSinglePost = (filter) => {
  return dispatch => {
    dispatch(requestPosts(filter));
    return fetch(`/wp-json/wp/v2/posts?filter[name]=${filter.slug}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(filter, json)));
  };
};

// fetch posts
const fetchPosts = (filter) => {
  return dispatch => {
    dispatch(requestPosts(filter));
    return fetch(`/wp-json/wp/v2/posts?filter[category_name]=${filter.category}&filter[tag]=${filter.tag}&filter[s]=${filter.search}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(filter, json)));
  };
};

const shouldFetchPosts = (state) => {
  const posts = state.posts;
  if (!posts) return true;
  if (posts.isFetching) return false;
};

export const fetchPostsIfNeeded = (filter) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts(filter));
    }
  };
};
