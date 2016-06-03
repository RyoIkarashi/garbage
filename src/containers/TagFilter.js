import { Component } from 'react';
import { connect } from 'react-redux';

export default class TagFilter extends Component {
  render() {
    let searchInput;
    let tagInput;
    let categoryInput;
    return (
      <div>
        <p>TagFilter</p>
        <form onSubmit={e => {
          e.preventDefault();
          if(!searchInput.value.trim() && !tagInput.value.trim() && !categoryInput.value.trim()) return;

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

function mapStateToProps (state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
}

export default connect(mapStateToProps)(TagFilter);
