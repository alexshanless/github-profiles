import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducers';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const intialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, intialState);

  const searchUser = async text => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(
      `https://api.github.com/search/users?${params}`
    );

    const { items } = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    });
  };

  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUser,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
