import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import dayjs from 'dayjs';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  useGetExpensesHistoryQuery,
  useDeleteExpenseMutation,
} from '../slices/expensesApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HistoryScreen = () => {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const { data, refetch, isLoading, error } = useGetExpensesHistoryQuery({
    pageNumber,
  });
  const { userInfo } = useSelector((state) => state.auth);

  function formatDate(date) {
    return dayjs(date).format('DD/MM/YYYY');
  }

  const [deleteExpenese, { isLoading: loading }] = useDeleteExpenseMutation();

  async function handleDelete(expense_id) {
    if (!window.confirm('Are you sure to delete the Expense?')) return;
    try {
      await deleteExpenese(expense_id);
      refetch();
      navigate('/user/history');
      toast.success('Expense Deleted Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : data.expenses.length === 0 ? (
        <Message variant="danger">No Expenses History found</Message>
      ) : (
        <>
          <h1>Expenses History</h1>
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
                <th>Approval Level</th>
                <th>Rejection Reason</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.expenses.map((expense) => (
                <tr key={expense._id} style={{ textAlign: 'center' }}>
                  <td>{expense.empName}</td>
                  <td>{expense.empId}</td>
                  <td>{expense.projName}</td>
                  <td>{expense.projId}</td>
                  <td>{expense.billProof}</td>
                  <td>
                    {expense.status === 'Reimbursed' ? (
                      <span style={{ color: '#58c445' }}>Reimbursed</span>
                    ) : expense.status === 'InProcess' ? (
                      <span style={{ color: '#0000FF' }}>InProcess</span>
                    ) : (
                      <span style={{ color: '#FF0000' }}>Rejected</span>
                    )}
                  </td>
                  <td>
                    {expense.currentStatus === 'EmployeeRequested'
                      ? 'HR Rejected'
                      : expense.currentStatus === 'HRApproved'
                      ? 'Director Rejected'
                      : expense.currentStatus === 'DirectorApproved'
                      ? 'FinanceDepartment Rejected'
                      : 'FinanceDepartment Approved'}
                  </td>
                  <td>
                    {expense.status === 'Rejected' ? (
                      expense.rejectionReason
                    ) : (
                      <span style={{ color: '#58c445' }}>Approved</span>
                    )}
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
                  <Paginate
                    pages={data.pages}
                    page={data.page}
                    keyword={'user/history'}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default HistoryScreen;
