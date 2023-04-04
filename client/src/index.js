import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import Reducer from './reducers';
import Chatbot from './components/ChatBot/Chatbot';

const store = legacy_createStore(Reducer, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode >
      <App />
    </React.StrictMode>
    <Chatbot />
  </Provider>
);

