import { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <section className="404">
        <div className="container">
          <div className="inner">
            <p>Sorry... The page you requested is not found :(</p>
          </div>
        </div>
      </section>
    );
  }
}
