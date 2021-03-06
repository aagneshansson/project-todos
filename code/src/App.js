import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { todos } from 'reducers/todos';
import { List } from 'components/List';

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
body {
  background-color: #fceef5;
}`;

// Combine reducers: tell redux about our reducers 
const reducer = combineReducers({
  todos: todos.reducer
});

// Store the code 
// 1) Retrieve the local storage and use it as out initial state

const persistedStateJSON = localStorage.getItem("reduxState");

let persistedState = {};

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
}

// 2) Create the store using the initial state and retrieved state 

const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 3) Store the state in localstorage on ANY redux state change 

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export const App = () => {
  //We cant use useDispatch or useSelector here
  return (
    <Provider store={store}>
      <GlobalStyle />
      <List />
    </Provider>
  );
};
