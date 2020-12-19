import React, { useEffect, useState } from 'react';
import './App.css';

import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useListPostsQuery } from './lib/api';

import { CreatePost } from './components/createPost';
import { API } from './lib/fetcher';

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

function App() {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<any | undefined>();

  const { data, isLoading } = useListPostsQuery(null, {
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData: any) => {
      setAuthState(nextAuthState);
      setUser(authData)

      API.updateIsSignedIn(nextAuthState === AuthState.SignedIn);
    });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      <div>
        <h2>Posts:</h2>
        {
          data?.listPosts?.items
            ? data?.listPosts?.items?.map(post => {
              return (
                <div>
                  <h4>Title: {post.title}</h4>
                  <h5>Owner: {post.owner}</h5>
                  <h5>Content: {post.content}</h5>
                </div>
              )
            })
            : <h4>No posts found</h4>
        }
      </div>
      <br />
      <br />
      <div>
        <CreatePost />
      </div>
    </div>
  );
}

export default withAuthenticator(App);
