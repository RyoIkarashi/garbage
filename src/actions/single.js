import fetch from 'isomorphic-fetch';
const BASE_URL = '/wp-json/wp/v2';

import {
  REQUEST_SINGLE_POST,
  RECEIVE_SINGLE_POST
} from '../constants';

// request single posts
const requestSinglePost = (slug) => ({
  type: REQUEST_SINGLE_POST,
  isFetching: true,
  slug
});

// receive posts
const receiveSinglePost = (slug, json) => ({
  type: RECEIVE_SINGLE_POST,
  isFetching: false,
  post: json,
  slug
});

// fetch single post
export const fetchSinglePost = (slug) => {
  return dispatch => {
    dispatch(requestSinglePost(slug));
    return fetch(`${BASE_URL}/posts?filter[name]=${slug}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSinglePost(slug, json[0])));
  };
};
