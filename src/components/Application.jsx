var React = require('react');
var Route = require('react-router');
var Reflux = require('reflux');
var $ = require('jquery');
var DocumentTitle = require('react-document-title');
var Loader = require('react-loader');

var Actions = require('./Actions');
var postListStore = require('./Store');

var Header = require('./Header');
var Aside  = require('./Aside');
var Main = require('./Main');
var Footer = require('./Footer');

module.exports = React.createClass({

  mixins: [Reflux.connect(postListStore, "list")],

  render() {

    return (
      <DocumentTitle title="garbage">
        <div>
          <Header />
          <Aside tags={this.state.list.tags} isFiltered={this.state.list.isFiltered} currentTag={this.state.list.currentTag} />
          <Loader loaded={this.state.list.loaded} color="#ff8088">
            <Main list={this.state.list} />
          </Loader>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
});
