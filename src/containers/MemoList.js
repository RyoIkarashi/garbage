import { Component } from 'react';
import { connect } from 'react-redux';
import MemoItem from '../components/MemoItem';
import { filterCategory, filterTag, filterSearch, fetchPostsIfNeeded } from '../actions';

class MemoList extends Component {

  componentDidMount() {
    this.setFilterByQuery();
  }

  setFilterByQuery() {
    const { dispatch, location } = this.props;
    const { query } = location;
    Object.keys(query).forEach(key => {
      switch(key) {
        case 'category':
          dispatch(filterCategory(query[key]));
          break;
        case 'tag':
          dispatch(filterTag(query[key]));
          break;
        case 'search':
          dispatch(filterSearch(query[key]));
          break;
        default:
          break;
      }
    });

    if(!(query.hasOwnProperty('category') || query.hasOwnProperty('tag') || query.hasOwnProperty('search'))) {
      dispatch(fetchPostsIfNeeded(this.props.filter));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    if(nextProps.filter !== this.props.filter) {
      dispatch(fetchPostsIfNeeded(nextProps.filter));
    }
  }

  render() {
    const { postsByFilter } = this.props;
    const { isFetching, items } = postsByFilter;

    const isEmpty = items.length === 0;

    return (

      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : items.map(item => <MemoItem key={item.id} item={item} />)
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { filter, postsByFilter } = state;

  return {
    filter,
    postsByFilter
  };
}

export default connect(mapStateToProps)(MemoList);
