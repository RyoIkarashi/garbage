import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { queryFilterTag, queryFilterCategory, queryFilterSearch, fetchPostsIfNeeded } from '../actions';

export default class TagFilter extends Component {

  componentWillReceiveProps(nextProps) {
    const { dispatch, queryFilter, pagination } = nextProps;
    if(queryFilter !== this.props.queryFilter) {
      dispatch(fetchPostsIfNeeded(queryFilter, pagination));
    }
  }

  render() {
    const { dispatch } = this.props;
    let searchInput;
    let tagInput;
    let categoryInput;

    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          
          // if there is no input, then show all posts again, if not, then show posts filtered by queries
          (!searchInput.value.trim() && !tagInput.value.trim() && !categoryInput.value.trim())
            ? dispatch(push('/'))
            : dispatch(push(`/?category=${categoryInput.value}&tag=${tagInput.value}&search=${searchInput.value}`));
              dispatch(queryFilterTag(tagInput.value));
              dispatch(queryFilterCategory(categoryInput.value));
              dispatch(queryFilterSearch(searchInput.value));

          categoryInput.value = '';
          tagInput.value = '';
          searchInput.value = '';
        }}>
          <input type="text" placeholder="category" ref={node => {
            categoryInput = node;
          }}/>
          <input type="text" placeholder="tag" ref={node => {
              tagInput = node;
          }}/>
          <input type="text" placeholder="search" ref={node => {
            searchInput = node;
          }}/>
          <button type="submit">Filter Posts</button>
        </form>
      </div>
    )
  }
}

export default connect()(TagFilter);
