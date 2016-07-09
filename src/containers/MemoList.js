import { Component } from 'react';
import { connect } from 'react-redux';
import MemoItem from '../components/MemoItem';
import { loadPosts } from '../actions';
import Paginator from './Paginator';

class MemoList extends Component {

  loadPosts() {
    const { filter, loadPosts, params } = this.props;
    loadPosts(filter, params);
  }

  componentWillMount() {
    this.loadPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.loadPosts(nextProps.filter, nextProps.params);
    }
  }

  render() {
    const {
      allPosts,
      nextPageUrl,
      postsPagination: { isFetching }
    } = this.props;

    return (
      <div>
        {
          !allPosts.length
            ? isFetching ? <h2>Loading...</h2> : <h2>Empty</h2>
            : allPosts.map(item => <MemoItem key={item.id} item={item} />)
        }
        {!nextPageUrl ? '' : <Paginator {...this.props} /> }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {

  const filter = ownProps.location.pathname;

  const {
    pagination: { postsByFilter },
    entities: { posts }
  } = state;

  const postsPagination = postsByFilter[filter] || { ids: [] };
  const allPosts = postsPagination.ids.map(id => posts[id]);
  const { nextPageUrl } = postsPagination;

  return {
    allPosts,
    filter,
    postsPagination,
    nextPageUrl
  };
}

export default connect(mapStateToProps, { loadPosts })(MemoList);
