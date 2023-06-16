import { Row, Col, Button } from 'react-bootstrap';
import { useGetExpensesQuery } from '../slices/expensesApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import EmployeeExpenseList from '../components/EmployeeExpenseList';
import HRExpenseList from '../components/HRExpenseList';
import DirectorExpenseList from '../components/DirectorExpenseList';
import FinanceDepartmentExpenseList from '../components/FinanceDepartmentExpenseList';

const HomeScreen = () => {
  const { data, refetch, isLoading, error } = useGetExpensesQuery({});
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo.userType === 'Employee' && (
        <Link to={'/addExpense'}>
          <Button variant="primary" className="my-2">
            Add Expense
          </Button>
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : data.length === 0 ? (
        <Message variant="danger">No Expenses Found</Message>
      ) : (
        <>
          <h1>Expenses List</h1>
          {userInfo.userType === 'Employee' && (
            <EmployeeExpenseList expenses={data} refetch={refetch} />
          )}
          {userInfo.userType === 'HR' && <HRExpenseList expenses={data} />}
          {userInfo.userType === 'Director' && (
            <DirectorExpenseList expenses={data} />
          )}
          {userInfo.userType === 'FinanceDepartment' && (
            <FinanceDepartmentExpenseList expenses={data} />
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
