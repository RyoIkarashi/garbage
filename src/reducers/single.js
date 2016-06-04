import { REQUEST_SINGLE_POST, RECEIVE_SINGLE_POST } from '../constants';

const post = (state = {
  isFetching: false,
  item: {}
}, action) => {
  switch (action.type) {
    case REQUEST_SINGLE_POST:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_SINGLE_POST:
      return {
        ...state,
        item: action.post,
        isFetching: false
      };
    default:
      return state;
  }
};

const single = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SINGLE_POST:
    case REQUEST_SINGLE_POST:
      return {
        ...state,
        [action.slug]: post(state[action.slug], action)
      };
    default:
      return state;
  }
};

export default single;
