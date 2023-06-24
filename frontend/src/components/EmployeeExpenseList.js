import Table from 'react-bootstrap/Table';
import dayjs from 'dayjs';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { useDeleteExpenseMutation } from '../slices/expensesApiSlice';
import Paginate from '../components/Paginate';

function ExpenseList(props) {
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
          <th>S.No</th>
          <th>Employee Name</th>
          <th>Employee Id</th>
          <th>Project Name</th>
          <th>Project Id</th>
          <th>Bill Proof</th>
          <th>Current Level</th>
          <th>Status</th>
          <th>Amount(₹)</th>
          <th>Description</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.data.expenses.map((expense) => (
          <tr key={expense._id} style={{ textAlign: 'center' }}>
            <td>{findIndex(index)}</td>
            <td>{expense.empName}</td>
            <td>{expense.empId}</td>
            <td>{expense.projName}</td>
            <td>{expense.projId}</td>
            <td>{expense.billProof}</td>
            <td>{expense.currentStatus}</td>
            <td>
              <span style={{ color: '#0000FF' }}>{expense.status}</span>
            </td>
            <td>{expense.amount}</td>
            <td>{expense.description}</td>
            <td>{formatDate(expense.date)}</td>
            <td align="center">
              <RiDeleteBin2Fill
                color="#FF0000"
                size={'1.5em'}
                onClick={() => handleDelete(expense._id)}
                style={{ cursor: 'pointer' }}
              />
            </td>
          </tr>
        ))}
        <tr style={{ all: 'initial' }}>
          <td style={{ borderStyle: 'none' }}></td>
        </tr>
        <tr style={{ all: 'initial' }}>
          <td style={{ all: 'initial' }}>
            <Paginate pages={props.data.pages} page={props.data.page} />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ExpenseList;
