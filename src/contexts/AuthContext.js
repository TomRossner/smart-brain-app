import React, { useState, useEffect, createContext } from 'react';
import { login, register } from '../utils/api';

export const AuthContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
    loadUser: () => {}
});

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const loadUser = (data) => {
      return setCurrentUser({
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joinedAt: data.joinedAt
      });
    }

    const loginUser = async (credentials) => {
      const response = await login(credentials);
      return loadUser(response);
    }

    const registerUser = async (data) => {
      return await register(data);
    }
    
    useEffect(() => {
      if (!currentUser) return;
      console.log(currentUser);
    }, [currentUser]);
    
    const value = {currentUser, setCurrentUser, loginUser, loadUser, registerUser};
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}