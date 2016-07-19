import { Component } from 'react';
import 'date-utils';

export default class Footer extends Component {
  render() {

    const dt = new Date();
    const year = dt.toFormat('YYYY');

    return (
      <footer className="[ page-micro ] footer">
        <small className="page-micro__copy">
          <span>{year} &copy; <b><a href="https://github.com/RyoIkarashi/garbage">Garbage</a></b> created by <a href="https://github.com/RyoIkarashi/garbage" className="name-name"><i className="fa fa-github"></i><b>Ryo Ikarashi</b></a></span>
        </small>
      </footer>
    );
  }
}
