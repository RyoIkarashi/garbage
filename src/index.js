import './styles.scss';

import ReactDOM from 'react-dom';
import App from './components/App';

if (typeof window !== 'undefined') {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

// var React = require('react');
// var Router = require('react-router');
// var {Route, DefaultRoute, NotFoundRoute} = Router;
//
// var Application = require('./components/Application');
// var PostList = require('./components/PostList');
// var NotFound = require('./components/NotFound');
//
// var routes = (
//   <Route name="application" path="/" handler={Application}>
//     <DefaultRoute name="root" handler={PostList} />
//     <NotFoundRoute handler={NotFound} />
//   </Route>
// );
//
// Router.run(routes, Router.HistoryLocation, (Handler, state) => {
//   React.render(<Handler/>, document.body);
// });
