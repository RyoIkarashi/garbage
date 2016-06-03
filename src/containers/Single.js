import { Component } from 'react';
import { connect } from 'react-redux';
import { filterSlug, fetchSinglePost } from '../actions';

class Single extends Component {

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(filterSlug(params.slug));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, filter } = nextProps;
    if (nextProps.filter !== this.props.filter) {
      dispatch(fetchSinglePost(filter));
    }
  }

  render() {
    const { postsByFilter } = this.props;
    const { isFetching, items } = postsByFilter;

    const isEmpty = items.length === 0;

    return (

      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : items.map(item =>
            <article key={item.id}>
              <h1>{item.title.rendered}</h1>
              <div dangerouslySetInnerHTML={{__html: item.content.rendered}}></div>
            </article>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
}

export default connect(mapStateToProps)(Single);
