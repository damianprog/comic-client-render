import React from 'react';
import App from '../../App';
import { ApolloClient } from 'apollo-client';
import { onError } from '@apollo/client/link/error';
import { from, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

const Provider = () => {
  // const history = useHistory();

  // const handleErrorsLink = onError(({ graphQLErrors }) => {
  //   if (graphQLErrors) {
  //     const handledError = graphQLErrors.find((error) => {
  //       const errorCode = error.extensions.code;
  //       return (
  //         errorCode === 'UNAUTHENTICATED' || errorCode === 'BAD_USER_INPUT'
  //       );
  //     });

  //     if (handledError) {
  //       const handledErrorCode = handledError.extensions.code;

  //       if (handledErrorCode === 'UNAUTHENTICATED') {
  //         history.push('/signout');
  //       }
  //     } else {
  //       history.push('/error-page');
  //     }
  //   }
  // });

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
  
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  
   const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Provider;