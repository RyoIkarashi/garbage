import merge from 'lodash/merge';
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

// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link')
  console.log('link', link);
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  console.log('NEXTLINK', nextLink);
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

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
              return merge({nextPageUrl: getNextPageUrl(res)}, normalize(json, arrayOf(postsSchema)));
            });
          },
          meta: { filter, nextPageUrl }
        },
        POSTS_FAILURE
      ]
    }
  };
}

export const loadPosts = (filter, params, nextPage) => {

  return (dispatch, getState) => {

    const { category = '', tag = '', search = '' } = params;

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
