import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  FILTER_SLUG, FILTER_CLEAN, FILTER_CATEGORY, FILTER_TAG, FILTER_SEARCH,
  RECEIVE_POSTS,
  REQUEST_POSTS
} from '../actions';

const filter = (state = {
  category: '',
  tag: '',
  search: '',
  slug: ''
}, action) => {
  switch (action.type) {
    case FILTER_SLUG:
      return {
        ...state,
        slug: action.slug
      };
    case FILTER_CATEGORY:
      return {
        ...state,
        category: action.category
      };
    case FILTER_TAG:
      return {
        ...state,
        tag: action.tag
      };
    case FILTER_SEARCH:
      return {
        ...state,
        search: action.search
      };
    case FILTER_CLEAN:
      return {
        ...state,
        category: '',
        tag: '',
        search: '',
        slug: ''
      };
    default:
      return state;
  }
};

const posts = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      }
    default:
      return state
  }
};

const postsByFilter = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return {
        ...state,
        ...posts(state, action)
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  routing: routerReducer,
  postsByFilter,
  filter
});

export default rootReducer;
