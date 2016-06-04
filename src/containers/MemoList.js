import { Component } from 'react';
import { connect } from 'react-redux';
import MemoItem from '../components/MemoItem';
import { queryFilterCategory, queryFilterTag, queryFilterSearch, fetchPostsIfNeeded } from '../actions';

class MemoList extends Component {

  componentDidMount() {
    this.setFilterByQuery();
  }

  setFilterByQuery() {
    const { dispatch, location, pagination, queryFilter } = this.props;
    const { query } = location;
    Object.keys(query).forEach(key => {

      switch(key) {
        case 'category':
          dispatch(queryFilterCategory(query[key]));
          break;
        case 'tag':
          dispatch(queryFilterTag(query[key]));
          break;
        case 'search':
          dispatch(queryFilterSearch(query[key]));
          break;
        default:
          break;
      }
    });

    if(!(query.hasOwnProperty('category') || query.hasOwnProperty('tag') || query.hasOwnProperty('search'))) {
      dispatch(fetchPostsIfNeeded(queryFilter, pagination));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, queryFilter, pagination } = nextProps;
    if(queryFilter !== this.props.queryFilter) {
      dispatch(fetchPostsIfNeeded(queryFilter, pagination));
    }
  }

  render() {
    const { allPosts } = this.props;
    const { isFetching, items } = allPosts;

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
  const { queryFilter, allPosts, pagination } = state;

  return {
    queryFilter,
    allPosts,
    pagination
  };
}

export default connect(mapStateToProps)(MemoList);
