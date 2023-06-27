import { Button } from 'react-bootstrap';
import { useGetExpensesQuery } from '../slices/expensesApiSlice';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import EmployeeExpenseList from '../components/EmployeeExpenseList';
import HRExpenseList from '../components/HRExpenseList';
import DirectorExpenseList from '../components/DirectorExpenseList';
import FinanceDepartmentExpenseList from '../components/FinanceDepartmentExpenseList';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (userInfo.userType === 'Admin') {
    navigate('/admin/userlist');
  }

  const { data, refetch, isLoading, error } = useGetExpensesQuery({
    keyword,
    pageNumber,
  });
  return (
    <>
      {userInfo.userType === 'Employee' && !keyword && (
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
      ) : data.expenses.length === 0 ? (
        <Message variant="danger">No Expenses Found</Message>
      ) : (
        <>
          <h1>Expense List</h1>
          {userInfo.userType === 'Employee' && (
            <EmployeeExpenseList
              data={data}
              refetch={refetch}
              keyword={keyword ? keyword : ''}
            />
          )}
          {userInfo.userType === 'HR' && (
            <HRExpenseList
              data={data}
              refetch={refetch}
              keyword={keyword ? keyword : ''}
            />
          )}
          {userInfo.userType === 'Director' && (
            <DirectorExpenseList
              data={data}
              refetch={refetch}
              keyword={keyword ? keyword : ''}
            />
          )}
          {userInfo.userType === 'FinanceDepartment' && (
            <FinanceDepartmentExpenseList
              data={data}
              refetch={refetch}
              keyword={keyword ? keyword : ''}
            />
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
