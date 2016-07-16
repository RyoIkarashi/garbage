import { Component } from 'react';
import { Link } from 'react-router';

export default class MemoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    return (
      <article className="layout__item desk-one-fifth">
        <Link to={`/posts/${item.slug}`}><h1>{item.title.rendered}</h1></Link>
        <div dangerouslySetInnerHTML={{__html: item.content.rendered}} />
      </article>
    )
  }
}
