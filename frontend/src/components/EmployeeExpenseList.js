import { Table, Col, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  useDeleteExpenseMutation,
  useDeleteExpenseIMageMutation,
} from '../slices/expensesApiSlice';
import Paginate from '../components/Paginate';
import ExpenseSearchBox from './ExpenseSearchBox';
import ImageModal from './ImageModal';

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
  const [deleteExpenseImage, { isLoading: loadingImage }] =
    useDeleteExpenseIMageMutation();

  async function handleDelete(expense_img, expense_id) {
    if (!window.confirm('Are you sure to delete the Expense?')) return;
    try {
      if (expense_img !== '' && expense_img !== 'Resource Link') {
        let newExpenseImg = expense_img.split('\\');
        newExpenseImg = newExpenseImg[newExpenseImg.length - 1];
        await deleteExpenseImage(newExpenseImg);
      }
      await deleteExpenese(expense_id);
      props.refetch();
      toast.success('Expense Deleted Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  return (
    <>
      {props.keyword && (
        <Link to="/" className="btn btn-light my-2">
          Go Back
        </Link>
      )}
      <Col className="my-2" md="6">
        <ExpenseSearchBox />
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
              {expense.billProof === 'Resource Link' ? (
                <td>No Image</td>
              ) : (
                <Container>
                  <ImageModal
                    src={process.env.REACT_APP_API + expense.billProof}
                  />
                </Container>
              )}
              <td>{expense.currentStatus}</td>
              <td>
                <span style={{ color: '#0000FF' }}>{expense.status}</span>
              </td>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{formatDate(expense.date)}</td>
              <td align="center">
                {expense.currentStatus === 'DirectorApproved' ? (
                  <RiDeleteBin2Fill
                    color="#FF0000"
                    size={'1.5em'}
                    onClick={() =>
                      alert(
                        'cannot delete an expense once it has all approvals'
                      )
                    }
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <RiDeleteBin2Fill
                    color="#FF0000"
                    size={'1.5em'}
                    onClick={() => handleDelete(expense.billProof, expense._id)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate
        pages={props.data.pages}
        page={props.data.page}
        keyword={props.keyword ? 'search/' + props.keyword : ''}
      />
    </>
  );
}

export default ExpenseList;
