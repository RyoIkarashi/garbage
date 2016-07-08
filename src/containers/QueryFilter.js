import { Component } from 'react';
import { connect } from 'react-redux';

export default class TagFilter extends Component {

  getFilteredPosts(categoryInput, tagInput, searchInput) {

    const { loadPosts, navigate } = this.props;

    let fullUrl = '';
    let params = {};

    // if there is no input, then show all posts again, if not, then show posts filtered by queries
    if (searchInput.value   !== '' ||
        tagInput.value      !== '' ||
        categoryInput.value !== '')
    {
      if (categoryInput.value !== '') {
        fullUrl += `/category/${categoryInput.value}`;
        params.category = categoryInput.value;
      }

      if (tagInput.value !== '') {
        fullUrl += `/tag/${tagInput.value}`;
        params.tag = tagInput.value;
      }

      if (searchInput.value !== '') {
        fullUrl += `/search/${searchInput.value}`;
        params.search = searchInput.value;
      }

      console.log(params);

      navigate(fullUrl);
      loadPosts(fullUrl, params);
    } else {
      navigate('/');
      loadPosts('/', params);
    }

    // clear inputs
    categoryInput.value = '';
    tagInput.value      = '';
    searchInput.value   = '';
  }

  render() {

    let categoryInput;
    let tagInput;
    let searchInput;

    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          this.getFilteredPosts(categoryInput, tagInput, searchInput);
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
