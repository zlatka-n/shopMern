import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsUserLoggedIn } from '../redux/accountSlice';

export function ProtectedRoute() {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/account/login" replace />;
}
