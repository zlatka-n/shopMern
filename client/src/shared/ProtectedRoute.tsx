import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsUserLoggedIn } from '../redux/accountSlice';

export function ProtectedRoute() {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const location = useLocation();

  return isUserLoggedIn ? <Outlet /> : (
    <Navigate
      to={{ pathname: '/account/login' }}
      state={{ prevPath: location.pathname }}
      replace
    />
  );
}
