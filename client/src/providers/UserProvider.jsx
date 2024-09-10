import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext({});


export const useUserContext = () => useContext(UserContext)


export default function UserProvider({ children }){
  const [userData, setUserData] = useState({id: null});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      { children }
    </UserContext.Provider>
  );
};