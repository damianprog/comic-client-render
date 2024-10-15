import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { store } from './components/redux/store';
import ApolloProvider from './components/apollo/apollo-provider';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider>
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
