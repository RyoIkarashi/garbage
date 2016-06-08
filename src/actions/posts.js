import { Schema, arrayOf, normalize } from 'normalizr';
import { CALL_API, getJSON } from 'redux-api-middleware';

const API_ROOT = '/wp-json/wp/v2';

const postsSchema = new Schema('posts', {
  idAttribute: post => post.slug
});

import {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_FAILURE
} from '../constants';

const fetchPosts = (filter, nextPageUrl) => {
  return {
    [CALL_API]: {
      endpoint: nextPageUrl,
      method: 'GET',
      types: [
        {
          type: POSTS_REQUEST,
          meta: { filter }
        },
        {
          type: POSTS_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => {
              return normalize(json, arrayOf(postsSchema));
            });
          },
          meta: { filter }
        },
        POSTS_FAILURE
      ]
    }
  };
}

export const loadPosts = (filter, params, nextPage) => {

  return (dispatch, getState) => {

    const { category = '' } = params;
    const { tag = '' } = params;
    const { search = '' } = params;

    const {
      nextPageUrl = `${API_ROOT}/posts?filter[category_name]=${category}&filter[tag]=${tag}&filter[s]=${search}`,
      pageCount = 0
    } = getState().pagination.postsByFilter[filter] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchPosts(filter, nextPageUrl));
  };
}
