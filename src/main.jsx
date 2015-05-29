var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute, NotFoundRoute, RouteHandler} = Router;

var Application = require('./components/Application');
var PostList = require('./components/PostList/PostList');
var History = require('./components/History/History');
var About = require('./components/About/About');
var NotFound = require('./components/NotFound/NotFound');

var routes = (
  <Route name="Application" path="/" handler={Application}>
    <DefaultRoute name="Root" handler={PostList} />
    <Route name="History" path="history" handler={History} />
    <Route name="About" path="about" handler={About} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler/>, document.body);
});
