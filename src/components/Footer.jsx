var React = require('react');
require('date-utils');

module.exports = React.createClass({

  render() {

    var dt = new Date();
    var year = dt.toFormat('YYYY');

      return (
        <footer className="footer clearfix" role="contentinfo">
          <small className="copyright">
            <span className="footer__top--xs">&copy; {year} All Rights Reserved | </span>
            <span className="foote__bottom--xs"><em>Garbage</em> created by <a href="https://github.com/RyoIkarashi/garbage" className="name-name"><i className="fa fa-github"></i> Ryo Ikarashi</a></span>
          </small>
        </footer>
    );
  }
});
