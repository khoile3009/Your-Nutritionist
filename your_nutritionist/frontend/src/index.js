import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScrollMemory from 'react-router-scroll-memory';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';



import authReducer from './store/reducers/auth';
import UIReducer from './store/reducers/UI';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  UI: UIReducer
})




const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const history = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <ScrollMemory/>
      <App />
    </BrowserRouter>
  </Provider>


  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export default  App
