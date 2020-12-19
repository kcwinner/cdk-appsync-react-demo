/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listTodos = /* GraphQL */ `
  query ListTodos {
    listTodos {
      id
      userId
      title
      completed
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      username
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        username
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($params: QueryGetTodoParamsInput!) {
    getTodo(params: $params) {
      id
      userId
      title
      completed
    }
  }
`;
