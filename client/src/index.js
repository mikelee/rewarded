import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';

import App from './App';
import { store } from './redux/store';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <Provider store={store} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
  </React.StrictMode>
);