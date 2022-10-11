/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useEffect, useState } from 'react';
import LocalStorageService from '../utils/local_storage';
import jwtDecode from '../utils/jwt_decode';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({isLoggedIn: false, user_id: null, access: null});

  useEffect(() => {
    setAuth((prev) => {
      return {
        ...prev,
        isLoggedIn: true,
        user_id: jwtDecode(LocalStorageService.getAccessToken()),
        access: LocalStorageService.getAccessToken()
      };
    });
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContext;