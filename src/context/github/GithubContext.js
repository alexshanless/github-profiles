import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducers';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const intialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, intialState);

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
