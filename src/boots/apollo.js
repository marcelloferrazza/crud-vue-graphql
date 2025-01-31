import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option'

// Configuração do Apollo Client
const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000', 
  cache: new InMemoryCache(),   
});

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
})

