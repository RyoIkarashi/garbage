import { Component } from 'react';
import { connect } from 'react-redux';
import { nextPage } from '../actions';

class Paginator extends Component {

  loadMore() {
    const { dispatch, pagination } = this.props;
    let next = ++pagination.pageNum;
    dispatch(nextPage(next));
  }

  render() {
    return (
      <button onClick={this.loadMore}>Load More.</button>
    )
  }
}

function mapStateToProps(state) {
  const { pagination } = state;
  return { pagination };
}

export default connect(mapStateToProps)(Paginator);
