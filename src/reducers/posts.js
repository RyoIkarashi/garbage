import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  CLEAR_POSTS
} from '../constants';

const posts = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_POSTS:
      console.log(action.posts);
      return {
        ...state,
        isFetching: false,
        items: action.posts
      };
    case CLEAR_POSTS:
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};

const allPosts = (state = {
  isFetching: false,
  tags: [],
  categories: [],
  search: [],
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

export default allPosts;
