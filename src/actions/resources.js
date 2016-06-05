import fetch from 'isomorphic-fetch';
const BASE_URL = '/wp-json/wp/v2';

import {
  REQUEST_POSTS_BY_RESOURCE,
  RECEIVE_POSTS_BY_RESOURCE
} from '../constants';

// request posts
const requestPostsByResource = (resource_type, resource_value, pagination) => ({
  type: REQUEST_POSTS_BY_RESOURCE,
  resource_type,
  resource_value,
  pagination
});

// receive posts
const receivePostsByResource = (resource_type, resource_value, json) => ({
  type: RECEIVE_POSTS_BY_RESOURCE,
  resource_type,
  resource_value,
  items: json.map(item => item)
});

// fetch posts
const fetchPostsByResource = (resource_type, resource_value, pagination) => {
  return (dispatch, getState) => {

    let query = '';
    let FETCH_URL = 'posts';

    switch (resource_type) {
      case 'tag': // for tag
      case 'category_name': // for category name
      case 's': // for search
        query = `?filter[${resource_type}]=${resource_value}`;
        FETCH_URL += query;
        break;
      default:
        break;
    }

    dispatch(requestPostsByResource(resource_type, resource_value, pagination));
    return fetch(`${BASE_URL}/${FETCH_URL}`)
      .then(response => response.json())
      .then(json => {
        if (pagination.pageNum > 1) {
          json = json.concat(getState().resources[resource_type][resource_value].items);
        }
        dispatch(receivePostsByResource(resource_type, resource_value, json));
      });
  };
};

const shouldFetchPostsByResource = (state) => {
  const posts = state.posts;
  if (!posts) return true;
  if (posts.isFetching) return false;
};

export const fetchPostsIfNeededByResource = (resource_type, resource_value, pagination) => {
  return (dispatch, getState) => {
    if (shouldFetchPostsByResource(getState())) {
      return dispatch(fetchPostsByResource(resource_type, resource_value, pagination));
    }
  };
};
