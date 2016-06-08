import { Component } from 'react';
import { connect } from 'react-redux';
import MemoItem from '../components/MemoItem';
import { loadPosts } from '../actions';

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
    const { allPosts } = this.props;

    if(!allPosts.length) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        { allPosts.map(item => <MemoItem key={item.id} item={item} />) }
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

  return {
    allPosts,
    filter,
    postsPagination
  };
}

export default connect(mapStateToProps, { loadPosts })(MemoList);
