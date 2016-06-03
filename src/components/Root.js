import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import routes from '../routes';

const Root = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

export default Root;
