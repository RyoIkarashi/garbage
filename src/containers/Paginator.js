// import { Component } from 'react';
import { connect } from 'react-redux';
import { filterPage } from '../actions';

const Paginator = ({dispatch, filter}) => {

  const loadMore = () => {
    let nextPage = ++filter.page;
    dispatch(filterPage(nextPage));
  };

  return (
    <button onClick={loadMore}>Load More.</button>
  )
}

function mapStateToProps(state) {
  const { filter, postsByFilter } = state;

  return {
    filter,
    postsByFilter
  };
}

export default connect(mapStateToProps)(Paginator);
