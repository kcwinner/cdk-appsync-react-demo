import React, { useEffect, useState } from 'react';
import './App.css';

import { useMutation } from 'react-query';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useListPostsQuery } from './lib/api';

import { CreatePostInput, CreatePostDocument, Post } from './lib/api';
import { API } from './lib/fetcher';

import Amplify, { Auth } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const initialState = { title: '', content: '' };

function App() {
  const [post, setPost] = useState(initialState);
  const { title, content } = post;

  const { data, isLoading, refetch } = useListPostsQuery(null, {
    refetchOnWindowFocus: false
  });

  // useCreatePostMutation isn't working correctly right now
  const [createPost] = useMutation(async (input: CreatePostInput) => {
    const result = await API.getInstance().query(CreatePostDocument, { input });
    return result.data?.createPost as Post;
  });

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData: any) => {
      API.updateIsSignedIn(nextAuthState === AuthState.SignedIn);
    });
  }, []);

  const onChange = (e) => {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }

  const createNewPost = async () => {
    if (!title || !content) return

    const userData = await Auth.currentAuthenticatedUser();

    const input = {
      ...post,
      username: userData.username
    };

    const createResult = await createPost(input, { onSuccess: (data) => { console.log(data) } });
    if (createResult) {
      refetch();
    }
  }

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
        <h3>Create Post:</h3>
        <div>
          <input onChange={onChange} name="title" placeholder="Title" />
        </div>
        <div>
          <textarea onChange={onChange} name="content" placeholder="Content" />
        </div>
        <div>
          <button onClick={createNewPost}>Create Post</button>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
