/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        toast('please login again');
      } finally {
        // eslint-disable-next-line no-unused-expressions
        setIsLoading(false);
      }
    };

    // eslint-disable-next-line no-unused-expressions
    !auth?.access ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{isLoading ? <p>loading...</p> : <Outlet />}</>;
}

export default PersistLogin;
