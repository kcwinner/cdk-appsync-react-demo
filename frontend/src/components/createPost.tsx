import React, { useState } from 'react';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { Auth, graphqlOperation } from 'aws-amplify';
import { useMutation } from 'react-query';

import { CreatePostInput, CreatePostDocument, Mutation, Post } from '../lib/api';

import { API } from '../lib/fetcher';

const initialState = { title: '', content: '' };

export function CreatePost(props) {
  const [post, setPost] = useState(initialState);
  const { title, content } = post;

  // useCreatePostMutation isn't working correctly right now
  const [createPost] = useMutation(async (input: CreatePostInput) => {
    const result = await API.getInstance().query(CreatePostDocument, { input });
    return result.data?.createPost as Post;
  });

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

    const result = await createPost(input, { onSuccess: (data) => { console.log(data) } });
    console.log(result);

    // useCreatePostMutation({ input }, {
    //   onSuccess: (data) => { console.log(data) }
    // });
  }

  return (
    <div>
      <h3>Create Post:</h3>
      <input onChange={onChange} name="title" placeholder="Title" />
      <textarea onChange={onChange} name="content" placeholder="Content" />
      <button onClick={createNewPost}>Create Post</button>
    </div>
  )
}