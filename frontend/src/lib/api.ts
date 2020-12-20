import {
  useMutation,
  MutationConfig,
  useQuery,
  QueryConfig
} from "react-query";
import { amplifyFetcher } from "../lib/fetcher";
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: any;
  AWSTime: any;
  AWSDateTime: any;
  AWSTimestamp: any;
  AWSEmail: any;
  AWSJSON: any;
  AWSURL: any;
  AWSPhone: any;
  AWSIPAddress: any;
  BigInt: any;
  Double: any;
};

export type Post = {
  __typename?: "Post";
  id: Scalars["ID"];
  title: Scalars["String"];
  content: Scalars["String"];
  username: Scalars["String"];
  createdAt: Scalars["AWSDateTime"];
  updatedAt: Scalars["AWSDateTime"];
  owner?: Maybe<Scalars["String"]>;
};

export type Todo = {
  __typename?: "Todo";
  id: Scalars["Int"];
  userId: Scalars["Int"];
  title: Scalars["String"];
  completed: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  listTodos?: Maybe<Array<Maybe<Todo>>>;
  getPost?: Maybe<Post>;
  listPosts?: Maybe<ModelPostConnection>;
  getTodo?: Maybe<Todo>;
};

export type QueryGetPostArgs = {
  id: Scalars["ID"];
};

export type QueryListPostsArgs = {
  filter?: Maybe<ModelPostFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type QueryGetTodoArgs = {
  params: QueryGetTodoParamsInput;
};

export enum ModelSortDirection {
  Asc = "ASC",
  Desc = "DESC"
}

export type ModelPostConnection = {
  __typename?: "ModelPostConnection";
  items?: Maybe<Array<Maybe<Post>>>;
  nextToken?: Maybe<Scalars["String"]>;
};

export type ModelStringFilterInput = {
  ne?: Maybe<Scalars["String"]>;
  eq?: Maybe<Scalars["String"]>;
  le?: Maybe<Scalars["String"]>;
  lt?: Maybe<Scalars["String"]>;
  ge?: Maybe<Scalars["String"]>;
  gt?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  notContains?: Maybe<Scalars["String"]>;
  between?: Maybe<Array<Maybe<Scalars["String"]>>>;
  beginsWith?: Maybe<Scalars["String"]>;
};

export type ModelIdFilterInput = {
  ne?: Maybe<Scalars["ID"]>;
  eq?: Maybe<Scalars["ID"]>;
  le?: Maybe<Scalars["ID"]>;
  lt?: Maybe<Scalars["ID"]>;
  ge?: Maybe<Scalars["ID"]>;
  gt?: Maybe<Scalars["ID"]>;
  contains?: Maybe<Scalars["ID"]>;
  notContains?: Maybe<Scalars["ID"]>;
  between?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  beginsWith?: Maybe<Scalars["ID"]>;
};

export type ModelIntFilterInput = {
  ne?: Maybe<Scalars["Int"]>;
  eq?: Maybe<Scalars["Int"]>;
  le?: Maybe<Scalars["Int"]>;
  lt?: Maybe<Scalars["Int"]>;
  ge?: Maybe<Scalars["Int"]>;
  gt?: Maybe<Scalars["Int"]>;
  between?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type ModelFloatFilterInput = {
  ne?: Maybe<Scalars["Float"]>;
  eq?: Maybe<Scalars["Float"]>;
  le?: Maybe<Scalars["Float"]>;
  lt?: Maybe<Scalars["Float"]>;
  ge?: Maybe<Scalars["Float"]>;
  gt?: Maybe<Scalars["Float"]>;
  between?: Maybe<Array<Maybe<Scalars["Float"]>>>;
};

export type ModelBooleanFilterInput = {
  ne?: Maybe<Scalars["Boolean"]>;
  eq?: Maybe<Scalars["Boolean"]>;
};

export type ModelPostFilterInput = {
  id?: Maybe<ModelIdFilterInput>;
  title?: Maybe<ModelStringFilterInput>;
  content?: Maybe<ModelStringFilterInput>;
  username?: Maybe<ModelStringFilterInput>;
  and?: Maybe<Array<Maybe<ModelPostFilterInput>>>;
  or?: Maybe<Array<Maybe<ModelPostFilterInput>>>;
  not?: Maybe<ModelPostFilterInput>;
};

export type CreatePostInput = {
  id?: Maybe<Scalars["ID"]>;
  title: Scalars["String"];
  content: Scalars["String"];
  username: Scalars["String"];
};

export type UpdatePostInput = {
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type DeletePostInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

export type MutationDeletePostArgs = {
  input: DeletePostInput;
};

export type Subscription = {
  __typename?: "Subscription";
  onCreatePost?: Maybe<Post>;
  onUpdatePost?: Maybe<Post>;
  onDeletePost?: Maybe<Post>;
};

export type SubscriptionOnCreatePostArgs = {
  owner?: Maybe<Scalars["String"]>;
};

export type SubscriptionOnUpdatePostArgs = {
  owner?: Maybe<Scalars["String"]>;
};

export type SubscriptionOnDeletePostArgs = {
  owner?: Maybe<Scalars["String"]>;
};

export type QueryGetTodoParamsInput = {
  id: Scalars["String"];
};

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;

export type UpdatePostMutation = { __typename?: "Mutation" } & {
  updatePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type DeletePostMutationVariables = Exact<{
  input: DeletePostInput;
}>;

export type DeletePostMutation = { __typename?: "Mutation" } & {
  deletePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type ListTodosQueryVariables = Exact<{ [key: string]: never }>;

export type ListTodosQuery = { __typename?: "Query" } & {
  listTodos?: Maybe<
    Array<
      Maybe<
        { __typename?: "Todo" } & Pick<
          Todo,
          "id" | "userId" | "title" | "completed"
        >
      >
    >
  >;
};

export type GetPostQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetPostQuery = { __typename?: "Query" } & {
  getPost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type ListPostsQueryVariables = Exact<{
  filter?: Maybe<ModelPostFilterInput>;
  limit?: Maybe<Scalars["Int"]>;
  nextToken?: Maybe<Scalars["String"]>;
}>;

export type ListPostsQuery = { __typename?: "Query" } & {
  listPosts?: Maybe<
    { __typename?: "ModelPostConnection" } & Pick<
      ModelPostConnection,
      "nextToken"
    > & {
        items?: Maybe<
          Array<
            Maybe<
              { __typename?: "Post" } & Pick<
                Post,
                | "id"
                | "title"
                | "content"
                | "username"
                | "createdAt"
                | "updatedAt"
                | "owner"
              >
            >
          >
        >;
      }
  >;
};

export type GetTodoQueryVariables = Exact<{
  params: QueryGetTodoParamsInput;
}>;

export type GetTodoQuery = { __typename?: "Query" } & {
  getTodo?: Maybe<
    { __typename?: "Todo" } & Pick<
      Todo,
      "id" | "userId" | "title" | "completed"
    >
  >;
};

export type OnCreatePostSubscriptionVariables = Exact<{
  owner?: Maybe<Scalars["String"]>;
}>;

export type OnCreatePostSubscription = { __typename?: "Subscription" } & {
  onCreatePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type OnUpdatePostSubscriptionVariables = Exact<{
  owner?: Maybe<Scalars["String"]>;
}>;

export type OnUpdatePostSubscription = { __typename?: "Subscription" } & {
  onUpdatePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export type OnDeletePostSubscriptionVariables = Exact<{
  owner?: Maybe<Scalars["String"]>;
}>;

export type OnDeletePostSubscription = { __typename?: "Subscription" } & {
  onDeletePost?: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      | "id"
      | "title"
      | "content"
      | "username"
      | "createdAt"
      | "updatedAt"
      | "owner"
    >
  >;
};

export const CreatePostDocument = `
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
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
export const useCreatePostMutation = (
  variables?: CreatePostMutationVariables,
  options?: MutationConfig<
    CreatePostMutation,
    unknown,
    CreatePostMutationVariables
  >
) =>
  useMutation<CreatePostMutation, unknown, CreatePostMutationVariables>(
    amplifyFetcher<CreatePostMutation, CreatePostMutationVariables>(
      CreatePostDocument,
      variables
    ),
    options
  );
export const UpdatePostDocument = `
    mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
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
export const useUpdatePostMutation = (
  variables?: UpdatePostMutationVariables,
  options?: MutationConfig<
    UpdatePostMutation,
    unknown,
    UpdatePostMutationVariables
  >
) =>
  useMutation<UpdatePostMutation, unknown, UpdatePostMutationVariables>(
    amplifyFetcher<UpdatePostMutation, UpdatePostMutationVariables>(
      UpdatePostDocument,
      variables
    ),
    options
  );
export const DeletePostDocument = `
    mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
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
export const useDeletePostMutation = (
  variables?: DeletePostMutationVariables,
  options?: MutationConfig<
    DeletePostMutation,
    unknown,
    DeletePostMutationVariables
  >
) =>
  useMutation<DeletePostMutation, unknown, DeletePostMutationVariables>(
    amplifyFetcher<DeletePostMutation, DeletePostMutationVariables>(
      DeletePostDocument,
      variables
    ),
    options
  );
export const ListTodosDocument = `
    query ListTodos {
  listTodos {
    id
    userId
    title
    completed
  }
}
    `;
export const useListTodosQuery = (
  variables?: ListTodosQueryVariables,
  options?: QueryConfig<ListTodosQuery>
) =>
  useQuery<ListTodosQuery>(
    ["ListTodos", variables],
    amplifyFetcher<ListTodosQuery, ListTodosQueryVariables>(
      ListTodosDocument,
      variables
    ),
    options
  );
export const GetPostDocument = `
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
export const useGetPostQuery = (
  variables: GetPostQueryVariables,
  options?: QueryConfig<GetPostQuery>
) =>
  useQuery<GetPostQuery>(
    ["GetPost", variables],
    amplifyFetcher<GetPostQuery, GetPostQueryVariables>(
      GetPostDocument,
      variables
    ),
    options
  );
export const ListPostsDocument = `
    query ListPosts($filter: ModelPostFilterInput, $limit: Int, $nextToken: String) {
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
export const useListPostsQuery = (
  variables?: ListPostsQueryVariables,
  options?: QueryConfig<ListPostsQuery>
) =>
  useQuery<ListPostsQuery>(
    ["ListPosts", variables],
    amplifyFetcher<ListPostsQuery, ListPostsQueryVariables>(
      ListPostsDocument,
      variables
    ),
    options
  );
export const GetTodoDocument = `
    query GetTodo($params: QueryGetTodoParamsInput!) {
  getTodo(params: $params) {
    id
    userId
    title
    completed
  }
}
    `;
export const useGetTodoQuery = (
  variables: GetTodoQueryVariables,
  options?: QueryConfig<GetTodoQuery>
) =>
  useQuery<GetTodoQuery>(
    ["GetTodo", variables],
    amplifyFetcher<GetTodoQuery, GetTodoQueryVariables>(
      GetTodoDocument,
      variables
    ),
    options
  );
export const OnCreatePostDocument = `
    subscription OnCreatePost($owner: String) {
  onCreatePost(owner: $owner) {
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
export const OnUpdatePostDocument = `
    subscription OnUpdatePost($owner: String) {
  onUpdatePost(owner: $owner) {
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
export const OnDeletePostDocument = `
    subscription OnDeletePost($owner: String) {
  onDeletePost(owner: $owner) {
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
