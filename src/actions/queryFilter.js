import {
  QUERY_FILTER_CATEGORY,
  QUERY_FILTER_TAG,
  QUERY_FILTER_SEARCH,
  QUERY_FILTER_CLEAN
} from '../constants';

// for categories
export const queryFilterCategory = (category) => {
  return {
    type: QUERY_FILTER_CATEGORY,
    category
  };
};

// for tags
export const queryFilterTag = (tag) => ({
  type: QUERY_FILTER_TAG,
  tag
});

// for search
export const queryFilterSearch = (search) => ({
  type: QUERY_FILTER_SEARCH,
  search
});

// clean all query filters
export const queryFilterClean = () => ({
  type: QUERY_FILTER_CLEAN
});
