import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter,
    Route,
  } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import {createStore, applyMiddleware, compose} from 'redux';
import herokuReducer from './reducers/herokuState';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const middleware = [thunk];

let initialState = {
  loadStatus: "",
  loadFailed: "false",
  newLink: "",
  setShow: false
}

const store = createStore(
  herokuReducer,
  initialState,
  compose(
  applyMiddleware(...middleware)
  )
);


ReactDOM.render(<BrowserRouter><Provider store={store}><Route path="/" render={(props) => <App {...props} />}  /></Provider></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
