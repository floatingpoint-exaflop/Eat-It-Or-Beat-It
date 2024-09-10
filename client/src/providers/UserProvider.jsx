import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export default function UserProvider ({ children }) {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};