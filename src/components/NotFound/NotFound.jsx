var React = require('react');
var Router = require('react-router');
var {State} = Router;
var DocumentTitle = require('react-document-title');

module.exports = React.createClass({

  mixins: [State],

  render() {
    return (
      <DocumentTitle title="garbage: not found :(">
        <main className="content-main pd-xs clearfix" role="main">
          <p>The webpage coudn't be found :(</p>
        </main>
      </DocumentTitle>
    );
  }
});
