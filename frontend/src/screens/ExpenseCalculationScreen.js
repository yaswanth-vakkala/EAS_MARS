import { Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import '../assets/styles/card.css';
import { toast } from 'react-toastify';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useAddMoneyMutation,
} from '../slices/usersApiSlice';
import {
  useGetExpenseDetailsQuery,
  useUpdateExpenseMutation,
} from '../slices/expensesApiSlice';

const ExpenseCalculationScreen = () => {
  const navigate = useNavigate();
  const { uid, eid } = useParams();
  const [addMoney, { isLoading: addMoneyLoadingUpdate }] =
    useAddMoneyMutation();
  const [updateExpense, { isLoading: loadingUpdate }] =
    useUpdateExpenseMutation();
  const {
    data: expense,
    isLoading,
    error,
    refetch,
  } = useGetExpenseDetailsQuery(eid);
  const {
    data: user,
    isLoading: loadingUser,
    error: userError,
    refetch: userRefetch,
  } = useGetUserDetailsQuery(uid);

  async function handleApprove() {
    let moneyToBeAdded = Number(user.amount) - Number(expense.amount);
    const employeeId = user._id;
    const data = {
      ...expense,
      currentStatus: 'FinanceDepartmentApproved',
      status: 'Reimbursed',
    };
    try {
      await updateExpense(data);
      await addMoney({
        employeeId,
        amount: moneyToBeAdded,
      });
      navigate('/');
      toast.success('Expense Approved Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  async function handleCalculate() {
    let moneyToBeAdded = Number(expense.amount) - Number(user.amount);
    const employeeId = user._id;
    const data = {
      ...expense,
      currentStatus: 'DirectorApproved',
      amount: moneyToBeAdded,
    };
    try {
      await updateExpense(data);
      if (user.amount !== 0 && user.amount !== '0') {
        await addMoney({
          employeeId,
          amount: Number(0),
        });
      }
      navigate('/');
      toast.success('Expense Approved Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <>
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>
      {isLoading && <Loader />}
      {loadingUser ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : userError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Card className="m-auto my-4 custom-mobileResponsive">
          <Card.Body>
            <Card.Title>Expense Calculation</Card.Title>
            <Card.Text>
              Current account balance of user named{' '}
              <strong>
                {user.firstName} {user.lastName}
              </strong>{' '}
              is{' '}
              <strong style={{ color: '#000000' }}>
                {currencyFormatter.format(user.amount)}
              </strong>
            </Card.Text>
            <Card.Text>
              The cost of the selected expense is{' '}
              <strong style={{ color: '#000000' }}>
                {currencyFormatter.format(expense.amount)}
              </strong>
            </Card.Text>

            {user.amount - expense.amount >= 0 && (
              <>
                <Card.Text>
                  On calculating we get,{' '}
                  <strong style={{ color: '#000000' }}>{user.amount} </strong> -{' '}
                  <strong style={{ color: '#000000' }}>{expense.amount}</strong>{' '}
                  =
                  <strong style={{ color: '#008000' }}>
                    {currencyFormatter.format(
                      Number(user.amount) - Number(expense.amount)
                    )}
                  </strong>{' '}
                  as the new account balance
                </Card.Text>
                <Card.Text>
                  <strong>
                    <span style={{ color: 'black' }}>Note:</span> Here we have
                    positive account balance, this means company has already
                    credited the employee with enough money for this expense.
                    So, on approving this expense finance Department doesn't
                    need to reimburse the expense.
                  </strong>
                </Card.Text>
                <Button
                  variant="success"
                  onClick={handleApprove}
                  className="my-2"
                >
                  Approve Expense
                </Button>
              </>
            )}
            {user.amount - expense.amount < 0 && (
              <>
                <Card.Text>
                  On calculating we get,{' '}
                  <strong style={{ color: '#000000' }}>{user.amount} </strong> -{' '}
                  <strong style={{ color: '#000000' }}>{expense.amount}</strong>{' '}
                  ={' '}
                  <strong style={{ color: '#FF0000' }}>
                    {currencyFormatter.format(
                      Number(user.amount) - Number(expense.amount)
                    )}
                  </strong>
                </Card.Text>
                <Card.Text>
                  Amount to be reimbursed is{' '}
                  <strong style={{ color: '#000000' }}>{user.amount} </strong> -{' '}
                  <strong style={{ color: '#000000' }}>{expense.amount}</strong>{' '}
                  ={' '}
                  <strong style={{ color: '#008000' }}>
                    {currencyFormatter.format(
                      (Number(user.amount) - Number(expense.amount)) * -1
                    )}
                  </strong>
                </Card.Text>
                <Card.Text>
                  The account balance will be{' '}
                  <strong style={{ color: '#000000' }}>
                    {currencyFormatter.format(0)}
                  </strong>
                </Card.Text>
                <Card.Text>
                  <strong>
                    <span style={{ color: 'black' }}>Note:</span> Here we have
                    negative account balance, this means company has not
                    credited the employee with enough money for this expense.
                    So, on approving this expense finance Department will
                    reimburse the remaining amount of the expense.
                  </strong>
                </Card.Text>
                <Button
                  variant="success"
                  onClick={handleCalculate}
                  className="my-2"
                >
                  Approve Expense
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ExpenseCalculationScreen;
