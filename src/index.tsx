import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, Store } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

interface RootProps {
  store: Store;
}

const Root: React.FC<RootProps> = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
