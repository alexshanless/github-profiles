import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducers';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const intialState = {
    users: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, intialState);

  const getUsers = async () => {
    const response = await fetch(`https://api.github.com/users`);

    const data = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, getUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
