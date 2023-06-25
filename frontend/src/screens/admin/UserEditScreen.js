import { useEffect, useState } from 'react';
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

const UserEditScreen = () => {
  const { id: employeeId } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');

  const {
    data: user,
    isLoading,
    error,
    refetch
  } = useGetUserDetailsQuery(employeeId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        employeeId,
        firstName,
        lastName,
        email,
        userId,
        userType,
      });
      toast.success('User Updated Successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setUserId(user.userId);
      setUserType(user.userType);
    }
  }, [user]);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User Details</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="userId">
              <Form.Label>Employee Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Employee Id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="userType">
              <Form.Label>userType</Form.Label>
              <Form.Select
                as="select"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
                <option value="Director">Director</option>
                <option value="FinanceDepartment">Finance Department</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
            <Link
              to={`/admin/user/${user._id}/editPassword`}
              className="btn btn-warning mx-4 my-3"
            >
              Edit Password
            </Link>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
