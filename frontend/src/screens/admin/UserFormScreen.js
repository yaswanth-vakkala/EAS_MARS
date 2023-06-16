import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useAddUserMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserFormScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('null');

  const navigate = useNavigate();

  const [addUser, { isLoading }] = useAddUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (userType === 'null') {
      toast.error('Select valid userType');
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        await addUser({
          firstName,
          lastName,
          email,
          userId,
          userType,
          password,
        });
        toast.success('User Created Successfully');
        navigate('/admin/userlist');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Add User</h1>
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
            <Form.Label>User Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Id"
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
              <option value="null">---</option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
              <option value="Director">Director</option>
              <option value="FinanceDepartment">Finance Department</option>
              <option value="Admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button disabled={isLoading} type="submit" variant="primary">
            Add User
          </Button>

          {isLoading && <Loader />}
        </Form>
      </FormContainer>
    </>
  );
};

export default UserFormScreen;
