import { useSelector } from 'react-redux';
import { Table, Col, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import {
  useGetExpensesHistoryQuery,
  useDeleteExpenseMutation,
  useDeleteExpenseIMageMutation,
} from '../slices/expensesApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import SearchBox from '../components/SearchBox';
import ImageModal from '../components/ImageModal';

const HistoryScreen = () => {
  const navigate = useNavigate();
  const { pageNumber, keyword } = useParams();
  const { data, refetch, isLoading, error } = useGetExpensesHistoryQuery({
    keyword,
    pageNumber,
  });
  const { userInfo } = useSelector((state) => state.auth);

  function formatDate(date) {
    return dayjs(date).format('DD/MM/YYYY');
  }

  let index = 0;
  function findIndex(i) {
    let row_index = i + 1;
    let serNum =
      process.env.REACT_APP_EXPENSES_HISTORY_PAGINATION_LIMIT *
        (data.page - 1) +
      row_index;
    index++;
    return serNum;
  }

  const [deleteExpenese, { isLoading: loading }] = useDeleteExpenseMutation();
  const [deleteExpenseImage, { isLoading: loadingImage }] =
    useDeleteExpenseIMageMutation();

  async function handleDelete(expense_img, expense_id) {
    if (
      !window.confirm(
        'This action will permenantly delete the Expense from database for everyone. Are you sure to delete the Expense?'
      )
    )
      return;
    try {
      if (expense_img !== '' && expense_img !== 'Resource Link') {
        let newExpenseImg = expense_img.split('\\');
        newExpenseImg = newExpenseImg[newExpenseImg.length - 1];
        await deleteExpenseImage(newExpenseImg);
      }
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
          {keyword && (
            <Link to="/user/history" className="btn btn-light my-2">
              Go Back
            </Link>
          )}
          <h1>Expenses History</h1>
          <Col className="my-2" md="6">
            <SearchBox />
          </Col>
          <Table hover bordered striped responsive>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>S.No</th>
                <th>Employee Name</th>
                <th>Employee Id</th>
                <th>Project Name</th>
                <th>Project Id</th>
                <th>Bill Proof</th>
                <th>Status</th>
                <th>Approval Level</th>
                <th>Rejection Reason</th>
                <th>Amount(₹)</th>
                <th>Description</th>
                <th>Date</th>
                {userInfo.userType !== 'Employee' && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {data.expenses.map((expense) => (
                <tr key={expense._id} style={{ textAlign: 'center' }}>
                  <td style={{ color: '#000000' }}>{findIndex(index)}</td>
                  <td>{expense.empName}</td>
                  <td>{expense.empId}</td>
                  <td>{expense.projName}</td>
                  <td>{expense.projId}</td>
                  {expense.billProof === 'Resource Link' ? (
                    expense.billProof
                  ) : (
                    <Container>
                      <ImageModal
                        src={process.env.REACT_APP_API + expense.billProof}
                      />
                    </Container>
                  )}
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
                  {userInfo.userType !== 'Employee' && (
                    <td align="center">
                      <RiDeleteBin2Fill
                        color="#FF0000"
                        size={'1.5em'}
                        onClick={() =>
                          handleDelete(expense.billProof, expense._id)
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={
              keyword ? 'user/history/search/' + keyword : 'user/history'
            }
          />
        </>
      )}
    </>
  );
};

export default HistoryScreen;
