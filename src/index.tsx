import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import firebase from "firebase/compat/app";
import "firebase/firestore";





const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const container = document.getElementById('root')!;


render(
  <React.StrictMode>
    <Root  />
  </React.StrictMode>,
  document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
