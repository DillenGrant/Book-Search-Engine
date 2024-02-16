import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AppNavbar from './components/Navbar';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/search" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;

const __DEV__ = process.env.NODE_ENV === 'development';

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}