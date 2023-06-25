import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const AddMoneyScreen = () => {
  const { id: employeeId } = useParams();
  const [money, setMoney] = useState('');

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(employeeId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let moneyToBeAdded = Number(money) + Number(user.amount);
    console.log(moneyToBeAdded);
    try {
      await updateUser({
        employeeId,
        amount: moneyToBeAdded,
      });
      refetch();
      navigate('/admin/userlist');
      toast.success('Money added Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add money to user account</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="money">
              <Form.Label>Enter Amount</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Enter Amount to be added"
                value={money}
                onChange={(e) => setMoney(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="success" className="my-2">
              Add Money
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AddMoneyScreen;
