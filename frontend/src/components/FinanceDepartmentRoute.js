import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FinanceDepartmentRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.userType === 'FinanceDepartment' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default FinanceDepartmentRoute;
