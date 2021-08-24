import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from 'state/context';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider
      child={<App />}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
