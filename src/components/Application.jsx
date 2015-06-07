var React = require('react');
var Route = require('react-router');
var {RouteHandler} = Route;
var Reflux = require('reflux');
var $ = require('jquery');
var DocumentTitle = require('react-document-title');

var Actions = require('./Actions');
var postListStore = require('./Store');

var Header = require('./Header');
var Aside  = require('./Aside');
var Footer = require('./Footer');

module.exports = React.createClass({

  mixins: [Reflux.connect(postListStore, "list")],

  render() {

    return (
      <DocumentTitle title="garbage">
        <div>
          <Header />
          <Aside list={this.state.list} />
          <RouteHandler {...this.state} />
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
});
