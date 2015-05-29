var React = require('react');
var Route = require('react-router');
var {Navigation, State} = Route;
var DocumentTitle = require('react-document-title');

module.exports = React.createClass({

  mixins: [Navigation, State],

  render() {

    var self = this;
    var numOfArticles = this.props.list.posts.length;
    var currentTag = this.props.list.currentTag;
    var isFiltered = this.props.list.isFiltered;
    var isCurrentTag = false;

    return(
      <DocumentTitle title="garbage: History">
        <main className="content-main pd-xs clearfix" role="main">
          <p>Welcome to History Page!</p>
          <div className="overlay"></div>
        </main>
      </DocumentTitle>
    );
  }
});
