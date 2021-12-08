import "./App.css";
import React from 'react';
import apolloClient from './apolloSetup';
// import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloProvider } from '@apollo/client';
import Subscription from './components/Subscription';
import Query from './components/QweryMutation';

const App = () => (
  <ApolloProvider client={apolloClient}>
      <Subscription />
      {/* <Query /> */}
  </ApolloProvider>
);
 
export default App;
