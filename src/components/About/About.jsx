var React = require('react');
var Router = require('react-router');
var {Navigation, State} = Router;
var DocumentTitle = require('react-document-title');

module.exports = React.createClass({

  mixins: [Navigation, State],

  render() {
    return (
      <DocumentTitle title="garbage: about">
        <main className="content-main pd-xs clearfix" role="main">
          <p>Welcome to About page :)</p>
        </main>
      </DocumentTitle>
    );
  }
});
