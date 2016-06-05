import {
  RECEIVE_POSTS_BY_RESOURCE,
  REQUEST_POSTS_BY_RESOURCE
} from '../constants';

const postsByResource = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS_BY_RESOURCE:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_POSTS_BY_RESOURCE:
      return {
        ...state,
        isFetching: false,
        items: action.items
      };
    default:
      return state;
  }
};

const resources = (state = {
  tag: {},
  category_name: {},
  s: {}
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS_BY_RESOURCE:
    case RECEIVE_POSTS_BY_RESOURCE:
      switch (action.resource_type) {
        case 'tag':
        case 'category_name':
        case 's':
          return {
            ...state,
            [action.resource_type]: {
              [action.resource_value]: postsByResource(state[action.resource_type][action.resource_value], action)
            }
          }
        default:
          return state
      }
    default:
      return state;
  }
};

export default resources;
