import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';

import './css/index.less';
import App from './app/App';
import store from './stores/store';

import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
      <Suspense fallback={<div>Loading..</div>}>
        <Route exact path="/">
          <App />
        </Route>
      </Suspense>
     </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
