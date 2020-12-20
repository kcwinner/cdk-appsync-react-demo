import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { API } from './lib/fetcher';

import { Posts } from './components/posts';
import { Todos } from './components/todos';

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 10000, // 10 seconds in milliseconds
      refetchOnMount: true,
      refetchOnWindowFocus: false
    }
  }
});

function App() {

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData: any) => {
      API.updateIsSignedIn(nextAuthState === AuthState.SignedIn);
    });
  }, []);

  return (
    <div className="App">
      <nav className="Navbar">
        <h1 className="navbar-logo">AppSync Transformer Demo</h1>
        <ul className="nav-menu">
          <li> <a href="/posts">Posts</a></li>
          <li> <a href="/todos">Todos</a></li>
        </ul>
        <AmplifySignOut />
      </nav>
      <div>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <Route exact path="/" render={(props: any) => <Posts {...props} />} />
              <Route path="/posts" render={(props: any) => <Posts {...props} />} />
              <Route path="/todos" render={(props: any) => <Todos {...props} />} />
            </Switch>
          </Router>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
