var React = require('react');
var Router = require('react-router');
var {State} = Router;

var Aside = require('./Aside');
var Main = require('./Main');
var Loader = require('react-loader');

module.exports = React.createClass({

  mixins: [State],

  render() {
    return (
      <div>
        <Aside {...this.props} />
        <Loader loaded={this.props.list.loaded} color="#ff8088">
          <Main {...this.props} />
        </Loader>
      </div>
    );
  }
});
