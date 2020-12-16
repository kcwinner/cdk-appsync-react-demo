import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { API, Auth } from 'aws-amplify';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const initialState = { title: '', content: '' }

const createPost = `
  mutation createPost($post: CreatePostInput!) {
    createPost(input: $post) {
      id
    }
  }
`;

function CreatePost() {
  const [post, setPost] = useState(initialState)
  const { title, content } = post
  const router = useRouter()

  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }

  async function createNewPost() {
    if (!title || !content) return

    const userData = await Auth.currentAuthenticatedUser();

    const createResult = await API.graphql({
      query: createPost,
      variables: { post: { ...post, username: userData.username } },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })

    if (createResult && createResult.data) {
      router.push(`/posts/${createResult.data?.createPost?.id}`);
    }
  }
  return (
    <div className={styles.container}>
      <h2>Create new Post</h2>
      <input onChange={onChange} name="title" placeholder="Title" />
      <textarea onChange={onChange} name="content" placeholder="Content" />
      <button onClick={createNewPost}>Create Post</button>
      <AmplifySignOut />
    </div>
  )
}

export default withAuthenticator(CreatePost)