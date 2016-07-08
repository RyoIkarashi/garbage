import { Component } from 'react';
import { connect } from 'react-redux';
import QueryFilter from '../containers/QueryFilter';
import { loadPosts } from '../actions';

class Header extends Component {
  render() {
    return (
      <header className="" role="banner">
        <QueryFilter {...this.props} />
      </header>
    )
  }
}

export default connect(null, { loadPosts })(Header);
