import * as ActionTypes from '../constants';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import paginate from './paginate';

const entities = (state = { posts: {} }, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }
  return state;
};

const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
};

const pagination = combineReducers({
  postsByFilter: paginate({
    mapActionToKey: action => {
      return action.meta.filter
    },
    types: [
      ActionTypes.POSTS_REQUEST,
      ActionTypes.POSTS_SUCCESS,
      ActionTypes.POSTS_FAILURE
    ]
  })
});

const rootReducer = combineReducers({
  routing,
  entities,
  pagination,
  errorMessage
});

export default rootReducer;
