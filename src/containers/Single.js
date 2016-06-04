import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../actions';

class Single extends Component {

  componentDidMount() {
    const { dispatch, params } = this.props;
      dispatch(fetchSinglePost(params.slug));
  }

  render() {
    const { isFetching, item } = this.props;
    const isEmpty = Object.keys(item).length === 0;

    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :  <article>
              <h1>{item.title.rendered}</h1>
              <div dangerouslySetInnerHTML={{__html: item.content.rendered}}></div>
            </article>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { single } = state;
  const { slug } = ownProps.params;
  const { isFetching, item } = single[slug] || { isFetching: true, item: {} };

  return {
    isFetching,
    item
  };
}

export default connect(mapStateToProps)(Single);
