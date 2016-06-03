import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import Single from './containers/Single';
import MemoList from './containers/MemoList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MemoList} />
    <Route path="posts/:slug" component={Single} />
    <Route path="tag/:name" component={MemoList} />
    <Route path="date/:year/(:month)/(:date)"component={MemoList} />
    <Route path="search/:words"component={MemoList} />
    <Route path="*" component={NotFound} />
  </Route>
);
