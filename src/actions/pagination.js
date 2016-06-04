import {
  NEXT_PAGE,
  PREV_PAGE,
  RESET_PAGE
} from '../constants';

// for next page
export const nextPage = (pageNum) => ({
  type: NEXT_PAGE,
  pageNum: pageNum++
});

// for pagination
export const prevPage = (pageNum) => ({
  type: PREV_PAGE,
  pageNum: pageNum--
});

// reset pagination
export const resetPage = () => ({
  type: RESET_PAGE,
  pageNum: 1
});
