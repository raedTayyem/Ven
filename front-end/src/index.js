import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { createHashHistory } from 'history'
// import { createBrowserHistory } from 'history';
import store from './store/store'

// const history = createBrowserHistory()



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
