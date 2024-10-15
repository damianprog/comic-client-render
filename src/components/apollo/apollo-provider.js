import React from 'react';
import App from '../../App';
import { onError } from '@apollo/client/link/error';
import { from, InMemoryCache, ApolloProvider, ApolloClient } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { persistor } from '../redux/store';

const Provider = () => {
  const history = useHistory();

  const handleErrorsLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      const handledError = graphQLErrors.find((error) => {
        const errorCode = error.extensions.code;
        return (
          errorCode === 'UNAUTHENTICATED' || errorCode === 'BAD_USER_INPUT'
        );
      });

      if (handledError) {
        const handledErrorCode = handledError.extensions.code;

        if (handledErrorCode === 'UNAUTHENTICATED') {
          history.push('/signout');
        }
      } else {
        history.push('/error-page');
      }
    }
  });

  const httpLink = new HttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('marvel_united_token');
  
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  
   const client = new ApolloClient({
      link: from([handleErrorsLink, authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  return (
    <ApolloProvider client={client}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </ApolloProvider>
  );
};

export default Provider;