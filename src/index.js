import './styles/main.css';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './store/configureStore';
require('./utils/hotreloadExtractedFiles');

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);
