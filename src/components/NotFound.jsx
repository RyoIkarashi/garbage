var React  = require('react');

module.exports = React.createClass({

  redirectToHP() {
    window.location.replace('/');
  },

  componentDidMount() {
    // this.interval = setInterval(this.redirectToHP, 5000);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    return (
      <div className="not-found-404">
        <div className="inner">
          <p className="not-found-wording--main">Page Not Found!</p>
          <p className="not-found-wording--sub">Redirecting to homepage after 5 sec or just click the button below.</p>
          <button onClick={this.redirectToHP} className="redirect-btn">Back to Home</button>
        </div>
      </div>
    );
  }
});
