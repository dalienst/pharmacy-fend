import { toast } from 'react-toastify';
import axios from '../api/axios';
import LocalStorageService from '../utils/local_storage';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    try {
      await axios('/logout', {
        withCredentials: true
      });
      LocalStorageService.clearToken();
    } catch (error) {
      toast('failed to logout');
    }
  };
  return logout;
};

export default useLogout;
