import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { publicLinks } from '../constants/links';
import useAuth from '../hooks/useAuth';

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.access ? (
    <Outlet />
  ) : (
    <Navigate to={publicLinks.Login} state={{ from: location }} replace />
  );
}

export default RequireAuth;