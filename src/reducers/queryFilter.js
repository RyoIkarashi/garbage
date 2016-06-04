import {
  QUERY_FILTER_CLEAN,
  QUERY_FILTER_CATEGORY,
  QUERY_FILTER_TAG,
  QUERY_FILTER_SEARCH
} from '../constants';

const queryFilter = (state = {
  category: '',
  tag: '',
  search: ''
}, action) => {
  switch (action.type) {
    case QUERY_FILTER_CATEGORY:
      return {
        ...state,
        category: action.category
      };
    case QUERY_FILTER_TAG:
      return {
        ...state,
        tag: action.tag
      };
    case QUERY_FILTER_SEARCH:
      return {
        ...state,
        search: action.search
      };
    case QUERY_FILTER_CLEAN:
      return {
        ...state,
        category: '',
        tag: '',
        search: ''
      };
    default:
      return state;
  }
};

export default queryFilter;
