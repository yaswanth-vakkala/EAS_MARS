import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useGetExpensesHistoryQuery } from '../slices/expensesApiSlice';
import EmployeeHistory from '../components/EmployeeHistory';
import HRHistory from '../components/HRHistory';
import DirectorHistory from '../components/DirectorHistory';
import FinanceDepartmentHistory from '../components/FinanceDepartmentHistory';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HistoryScreen = () => {
  const { data, isLoading, error } = useGetExpensesHistoryQuery({});
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : data.length === 0 ? (
        <Message variant="danger">No Expenses History found</Message>
      ) : (
        <>
          <h1>Expenses History</h1>
          {userInfo.userType === 'Employee' && (
            <EmployeeHistory expenses={data} />
          )}
          {userInfo.userType === 'HR' && <HRHistory expenses={data} />}
          {userInfo.userType === 'Director' && (
            <DirectorHistory expenses={data} />
          )}
          {userInfo.userType === 'FinanceDepartment' && (
            <FinanceDepartmentHistory expenses={data} />
          )}
        </>
      )}
    </>
  );
};

export default HistoryScreen;
