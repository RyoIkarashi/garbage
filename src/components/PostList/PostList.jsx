var React = require('react');
var Router = require('react-router');
var {State} = Router;

var Aside = require('./Aside');
var Main = require('./Main');

module.exports = React.createClass({

  mixins: [State],

  render() {
    return (
      <div>
        <Aside {...this.props} />
        <Main {...this.props} />
      </div>
    );
  }
});
