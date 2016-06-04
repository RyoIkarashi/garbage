import {
  NEXT_PAGE,
  PREV_PAGE,
  RESET_PAGE
} from '../constants';

const pagination = (state = {
  pageNum: 1
}, action) => {
  switch (action.type) {
    case NEXT_PAGE:
    case PREV_PAGE:
    case RESET_PAGE:
      return {
        ...state,
        pageNum: action.pageNum
      };
    default:
      return state;
  }
};

export default pagination;
