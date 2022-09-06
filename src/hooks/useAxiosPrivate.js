import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${auth?.access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          previousRequest.sent = true;
          const newAccessToken = await refresh();
          previousRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(previousRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
