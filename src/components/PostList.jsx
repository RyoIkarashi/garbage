var React = require('react');

var Main = require('./Main');
var Loader = require('react-loader');

module.exports = React.createClass({
  render() {
    return (
      <Loader loaded={this.props.list.loaded} color="#ff8088">
        <Main list={this.props.list} />
      </Loader>
    );
  }
});
