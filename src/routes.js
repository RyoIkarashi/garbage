import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import Single from './containers/Single';
import MemoList from './containers/MemoList';
import MemoListByResource from './containers/MemoListByResource';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MemoList} />
    <Route path="posts/:slug" component={Single} />
    <Route path="tag/:name" component={MemoListByResource} />
    <Route path="category_name/:name"component={MemoListByResource} />
    <Route path="s/:name"component={MemoListByResource} />
    {/* <Route path="date/:year/(:month)/(:date)"component={MemoListByResource} /> */}
    <Route path="*" component={NotFound} />
  </Route>
);
