import jwtDecode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import LocalStorageService from '../utils/local_storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    setAuth((prev) => {
      return {
        ...prev,
        user_id: jwtDecode(LocalStorageService.getAccessToken()).user_id,
        access: LocalStorageService.getAccessToken()
      };
    });
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContext;