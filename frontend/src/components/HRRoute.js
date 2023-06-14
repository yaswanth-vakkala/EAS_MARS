import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HRExpense = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.userType === 'HR' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default HRExpense;
