import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import allPosts from './posts';
import single from './single';
import queryFilter from './queryFilter';
import pagination from './pagination';

const rootReducer = combineReducers({
  routing: routerReducer,
  allPosts,
  single,
  queryFilter,
  pagination
});

export default rootReducer;
