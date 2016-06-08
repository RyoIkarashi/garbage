import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import Single from './containers/Single';
import MemoList from './containers/MemoList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MemoList} />
    <Route path="posts/:slug" component={Single} />

    <Route path="category/:category"component={MemoList} />
    <Route path="category/:category/search/:search" component={MemoList} />
    <Route path="category/:category/tag/:tag" component={MemoList} />
    <Route path="category/:category/tag/:tag/search/:search" component={MemoList} />

    <Route path="tag/:tag" component={MemoList} />
    <Route path="tag/:tag/search/:search" component={MemoList} />

    <Route path="search/:search"component={MemoList} />

    {/* <Route path="date/:year/(:month)/(:date)"component={MemoList} /> */}

    <Route path="*" component={NotFound} />
  </Route>
);
