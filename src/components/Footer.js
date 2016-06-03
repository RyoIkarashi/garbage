import { Component } from 'react';
import 'date-utils';

export default class Footer extends Component {
  render() {

    const dt = new Date();
    const year = dt.toFormat('YYYY');

    return (
      <footer className="footer clearfix" role="contentinfo">
        <small className="copyright">
          <span className="footer__top--xs">&copy; {year} All Rights Reserved | </span>
          <span className="foote__bottom--xs"><em>Garbage</em> created by <a href="https://github.com/RyoIkarashi/garbage" className="name-name"><i className="fa fa-github"></i> <strong>Ryo Ikarashi</strong></a></span>
        </small>
      </footer>
    );
  }
}
