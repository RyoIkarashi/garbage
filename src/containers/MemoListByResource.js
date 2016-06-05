import { Component } from 'react';
import { connect } from 'react-redux';
import MemoItem from '../components/MemoItem';
import { fetchPostsIfNeededByResource } from '../actions';

class MemoListByResource extends Component {

  componentDidMount() {
    this.fetchPostsByResource();
  }

  fetchPostsByResource() {
    const { dispatch, pagination, resource_type, resource_value } = this.props;
    dispatch(fetchPostsIfNeededByResource(resource_type, resource_value, pagination));
  }

  render() {
    const { isFetching, items } = this.props;
    const isEmpty = items.length === 0;

    return (

      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : items.map(item => <MemoItem key={item.id} item={item} />)
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { pagination } = state;
  const { location, params } = ownProps;
  const resource_type = location.pathname.split('/')[1];
  const resource_value = params.name;
  const resource = state.resources[resource_type][resource_value];
  const { isFetching, items } = resource || { isFetching: true, items: [] };

  return {
    isFetching,
    items,
    resource_type,
    resource_value,
    pagination
  };
}

export default connect(mapStateToProps)(MemoListByResource);
