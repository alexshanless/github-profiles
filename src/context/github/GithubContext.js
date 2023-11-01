import { createContext, useState } from 'react';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const response = await fetch(`https://api.github.com/users`);

    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  return (
    <GithubContext.Provider value={{ users, loading, getUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
