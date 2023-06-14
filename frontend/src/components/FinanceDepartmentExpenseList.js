import Table from 'react-bootstrap/Table';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { useUpdateExpenseMutation } from '../slices/expensesApiSlice';

const FinanceDepartmentExpenseList = (props) => {
  function formatDate(date) {
    return dayjs(date).format('DD/MM/YYYY');
  }

  const [updateExpense, { isLoading }] = useUpdateExpenseMutation();

  async function handleApprove(expense) {
    const data = {
      ...expense,
      currentStatus: 'FinanceDepartmentApproved',
      status: 'Reimbursed',
    };
    if (!window.confirm('Are you sure to Accept the Expense?')) return;
    try {
      await updateExpense(data);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  async function handleReject(expense) {
    const data = { ...expense, status: 'Rejected' };
    if (!window.confirm('Are you sure to Reject the Expense?')) return;
    try {
      await updateExpense(data);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <Table hover bordered striped responsive>
      <thead>
        <tr style={{ textAlign: 'center' }}>
          {/* <th>#</th> */}
          <th>Employee Name</th>
          <th>Employee Id</th>
          <th>Project Name</th>
          <th>Project Id</th>
          <th>Bill Proof</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.expenses.map((expense) => (
          <tr key={expense._id} style={{ textAlign: 'center' }}>
            <td>{expense.empName}</td>
            <td>{expense.empId}</td>
            <td>{expense.projName}</td>
            <td>{expense.projId}</td>
            <td>{expense.billProof}</td>
            <td>{expense.status}</td>
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
                color="green"
                onClick={() => handleApprove(expense)}
                style={{ cursor: 'pointer' }}
              />
              <AiOutlineClose
                size={'1.7em'}
                color="red"
                onClick={() => handleReject(expense)}
                style={{ cursor: 'pointer' }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FinanceDepartmentExpenseList;
