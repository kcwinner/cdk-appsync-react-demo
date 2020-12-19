import React from 'react';

import { useListTodosQuery } from '../lib/api';

export function Todos() {
  const { data, isLoading } = useListTodosQuery(null, {
    refetchOnWindowFocus: false
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      <div>
        <h2>Todos:</h2>
        {
          data?.listTodos.length > 0
            ? data?.listTodos.map(todo => {
              return (
                <div>
                  <h4>Title: {todo.title}</h4>
                  <h5>Owner: {todo.userId}</h5>
                </div>
              )
            })
            : <h4>No todos found</h4>
        }
      </div>
    </div>
  );
}
