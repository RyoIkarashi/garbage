import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import allPosts from './posts';
import single from './single';
import queryFilter from './queryFilter';
import pagination from './pagination';
import resources from './resources';

const rootReducer = combineReducers({
  routing: routerReducer,
  allPosts,
  single,
  queryFilter,
  resources,
  pagination
});

export default rootReducer;
