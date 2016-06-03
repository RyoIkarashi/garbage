import { Component } from 'react';
import TagFilter from '../containers/TagFilter';

export default class Aside extends Component {
  render() {
    return (
      <aside>
        <TagFilter />
      </aside>
    )
  }
}
