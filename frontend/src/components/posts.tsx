import React, { useState } from 'react';
import { Auth } from '@aws-amplify/auth';

import { ListPostsQuery, Post, useListPostsQuery, useListPostsQueryModified, useCreatePostMutation } from '../lib/api';

const initialState = { title: '', content: '', username: '' };

export function Posts() {
  const [post, setPost] = useState(initialState);
  const { title, content } = post;

  // const { data, isLoading, refetch } = useListPostsQuery(null, {
  //   refetchOnWindowFocus: false,
  //   select: (posts) => { console.log(posts); return posts }
  // });

  const { data, isLoading, refetch } = useListPostsQueryModified(null, {
    refetchOnWindowFocus: false,
    select: (posts) => posts.listPosts?.items ?? []
  });

  const { mutateAsync } = useCreatePostMutation();

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

    const createResult = await mutateAsync({ input });
    if (createResult) {
      refetch();
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2>Posts:</h2>
        {
          data.length > 0
            ? data.map(post => {
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
