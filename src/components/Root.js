import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { history } from '../services';
import routes from '../routes';

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
};

export default Root;
