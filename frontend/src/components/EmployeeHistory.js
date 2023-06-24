import Table from 'react-bootstrap/Table';
import dayjs from 'dayjs';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { useDeleteExpenseMutation } from '../slices/expensesApiSlice';

const EmployeeHistory = (props) => {
  function formatDate(date) {
    return dayjs(date).format('DD/MM/YYYY');
  }

  const [deleteExpenese, { isLoading }] = useDeleteExpenseMutation();

  async function handleDelete(expense_id) {
    if (!window.confirm('Are you sure to delete the Expense?')) return;
    try {
      await deleteExpenese(expense_id);
      props.refetch();
      toast.success('Expense Deleted Successfully');
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
        {props.expenses.expenses.map((expense) => (
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
            <td align="center">
              <RiDeleteBin2Fill
                color="red"
                size={'1.5em'}
                onClick={() => handleDelete(expense._id)}
                style={{ cursor: 'pointer' }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeHistory;
