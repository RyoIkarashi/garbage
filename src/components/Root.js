import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import routes from '../routes';

const Root = ({store}) => {

  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
};

export default Root;
