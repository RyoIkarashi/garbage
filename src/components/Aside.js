import { Component } from 'react';
import QueryFilter from '../containers/QueryFilter';

export default class Aside extends Component {
  render() {
    return (
      <aside>
        <QueryFilter {...this.props} />
      </aside>
    )
  }
}
