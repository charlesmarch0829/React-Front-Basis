import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import router from './router';
import { Provider } from 'mobx-react';
import { observer } from 'mobx-react';

import AppStore from './store';

if (!window.store) {
  window.store = new AppStore();
}

function App() {
  useEffect(() => {
    console.log('store: ', window.store.profile);
  });
  const content = useRoutes(router);
  return <Provider store={window.store}>{content}</Provider>;
}

export default observer(App);
