import fetch from 'isomorphic-fetch';
const BASE_URL = '/wp-json/wp/v2';

import {
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../constants';

// request posts
const requestPosts = (queryFilter, pagination) => ({
  type: REQUEST_POSTS,
  queryFilter,
  pagination
});

// receive posts
const receivePosts = (queryFilter, json) => ({
  type: RECEIVE_POSTS,
  queryFilter,
  posts: json.map(item => item)
});

// fetch posts
const fetchPosts = (queryFilter, pagination) => {
  return (dispatch, getState) => {
    dispatch(requestPosts(queryFilter, pagination));
    return fetch(`${BASE_URL}/posts?page=${pagination.pageNum}&filter[category_name]=${queryFilter.category}&filter[tag]=${queryFilter.tag}&filter[s]=${queryFilter.search}`)
      .then(response => response.json())
      .then(json => {
        if (pagination.pageNum > 1) {
          json = json.concat(getState().allPosts.items);
        }
        dispatch(receivePosts(queryFilter, json));
      });
  };
};

const shouldFetchPosts = (state) => {
  const posts = state.posts;
  if (!posts) return true;
  if (posts.isFetching) return false;
};

export const fetchPostsIfNeeded = (queryFilter, pagination) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts(queryFilter, pagination));
    }
  };
};
