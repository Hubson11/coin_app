import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import { noteboxReducer } from './redux/reducers/Notebox/';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(noteboxReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
