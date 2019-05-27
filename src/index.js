import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { coins, markets } from './redux/reducers/Notebox/';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    coins,
    markets,
  })

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
