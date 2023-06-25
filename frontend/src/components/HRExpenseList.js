import Table from 'react-bootstrap/Table';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

import { useUpdateExpenseMutation } from '../slices/expensesApiSlice';
import Paginate from '../components/Paginate';

const HRExpenseList = (props) => {
  let index = 0;
  function findIndex(i) {
    let row_index = i + 1;
    let serNum =
      process.env.REACT_APP_EXPENSES_PAGINATION_LIMIT * (props.data.page - 1) +
      row_index;
    index++;
    return serNum;
  }
  function formatDate(date) {
    return dayjs(date).format('DD/MM/YYYY');
  }

  const [updateExpense, { isLoading }] = useUpdateExpenseMutation();

  async function handleApprove(expense) {
    if (!window.confirm('Are you sure to Accept the Expense?')) return;
    const data = { ...expense, currentStatus: 'HRApproved' };
    try {
      await updateExpense(data);
      props.refetch();
      toast.success('Expense Approved Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  async function handleReject(expense) {
    let rejectionReason = prompt('Please enter the reason for rejection: ');
    if (rejectionReason === null) return;
    const data = {
      ...expense,
      status: 'Rejected',
      rejectionReason: rejectionReason,
    };
    try {
      await updateExpense(data);
      props.refetch();
      toast.success('Expense Rejected Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <Table hover bordered striped responsive>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>S.No</th>
            <th>Employee Name</th>
            <th>Employee Id</th>
            <th>Project Name</th>
            <th>Project Id</th>
            <th>Bill Proof</th>
            <th>Amount(₹)</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.expenses.map((expense) => (
            <tr key={expense._id} style={{ textAlign: 'center' }}>
              {findIndex(index)}
              <td>{expense.empName}</td>
              <td>{expense.empId}</td>
              <td>{expense.projName}</td>
              <td>{expense.projId}</td>
              <td>{expense.billProof}</td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{formatDate(expense.date)}</td>
              <td
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <AiOutlineCheck
                  size={'1.7em'}
                  color="#00FF00"
                  onClick={() => handleApprove(expense)}
                  style={{ cursor: 'pointer' }}
                />
                <AiOutlineClose
                  size={'1.7em'}
                  color="#FF0000"
                  onClick={() => handleReject(expense)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate pages={props.data.pages} page={props.data.page} />
    </>
  );
};

export default HRExpenseList;
