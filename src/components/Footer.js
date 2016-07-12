import { Component } from 'react';
import 'date-utils';

export default class Footer extends Component {
  render() {

    const dt = new Date();
    const year = dt.toFormat('YYYY');

    return (
      <footer className="footer" role="contentinfo">
        <small className="copy">
          <span className="copy__desc">&copy; {year} All Rights Reserved | </span>
          <span className="copy__desc"><em><a href="https://github.com/RyoIkarashi/garbage">Garbage</a></em> created by <a href="https://github.com/RyoIkarashi/garbage" className="name-name"><i className="fa fa-github"></i> <strong>Ryo Ikarashi</strong></a></span>
        </small>
      </footer>
    );
  }
}
