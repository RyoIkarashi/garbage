import { Component } from 'react';
import { connect } from 'react-redux';
import { loadPosts } from '../actions';

class Paginator extends Component {

  constructor(props) {
    super(props);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  handleLoadMoreClick() {
    const { loadPosts, filter, params } = this.props;
    loadPosts(filter, params, true);
  }

  render() {
    return (
      <button onClick={this.handleLoadMoreClick}>Load More.</button>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const filter = ownProps.location.pathname;
  const { params } = ownProps;
  return {
    filter,
    params
  };
}

export default connect(mapStateToProps, { loadPosts })(Paginator);
