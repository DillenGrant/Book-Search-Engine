import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Your Apollo Server URL
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/search" component={SearchBooks} />
        <Route exact path="/saved" component={SavedBooks} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/login" component={LoginForm} />
      </Router>
    </ApolloProvider>
  );
}

export default App;


if (__DEV__) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}