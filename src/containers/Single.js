import { Component } from 'react';
import { connect } from 'react-redux';
import { loadPosts } from '../actions';

class Single extends Component {

  componentDidMount() {
    const { filter, params, loadPosts } = this.props;
    loadPosts(filter, params);
  }

  render() {
    const {
      allPosts,
      postsPagination: { isFetching }
    } = this.props;

    const isEmpty = allPosts.length === 0;
    const item = allPosts[0];
    
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :  <article>
              <h1>{item.title.rendered}</h1>
              <div dangerouslySetInnerHTML={{__html: item.content.rendered}}></div>
            </article>
        }
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

export default connect(mapStateToProps, { loadPosts })(Single);
