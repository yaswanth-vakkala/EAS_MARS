import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DirectorRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.userType === 'Director' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default DirectorRoute;
