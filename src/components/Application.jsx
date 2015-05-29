var React = require('react');
var Route = require('react-router');
var {RouteHandler} = Route;
var DocumentTitle = require('react-document-title');

var Reflux = require('reflux');
var Actions = require('./Actions');
var postListStore = require('./Store');

var $ = require('jquery');

var Header = require('./Header');
var Footer = require('./Footer');

module.exports = React.createClass({

  mixins: [Reflux.connect(postListStore, "list")],

  render() {

    return (
      <DocumentTitle title="garbage">
        <div>
          <Header />
          <RouteHandler {...this.state} />
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
});
