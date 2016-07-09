import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default class TagFilter extends Component {

  initQueryFilter() {
    const { loadCategories, loadTags } = this.props;
    loadCategories();
    loadTags();
  }

  getFilteredPosts(categoryInput, tagInput, searchInput) {

    const { dispatch, loadPosts } = this.props;

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

      dispatch(push(fullUrl));
      loadPosts(fullUrl, params, false);
    } else {
      dispatch(push('/'))
      loadPosts('/', params, false);
    }

    // clear inputs
    categoryInput.value = '';
    tagInput.value      = '';
    searchInput.value   = '';
  }

  componentDidMount() {
    this.initQueryFilter();
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

          <select ref={node => { categoryInput = node}}>
            {Object.keys(this.props.categories).length
              ? Object.values(this.props.categories).map(category => <option key={category.slug} value={category.slug}>{category.slug}</option>)
              : <option value="">Loading...</option>
            }
          </select>

          <select ref={node => { tagInput = node}}>
            {Object.keys(this.props.tags).length
              ? Object.values(this.props.tags).map(tag => <option key={tag.slug} value={tag.slug}>{tag.slug}</option>)
              : <option value="">Loading...</option>
            }
          </select>
          
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
