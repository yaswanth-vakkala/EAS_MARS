import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useCreateExpenseMutation } from '../slices/expensesApiSlice';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const ExpenseForm = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empName, setEmpName] = useState(
    userInfo.firstName + ' ' + userInfo.lastName
  );
  const [empId, setEmpId] = useState(userInfo.userId);
  const [projName, setProjName] = useState('');
  const [projId, setProjId] = useState('');
  const [billProof, setbillProof] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const [createExpense, { isLoading }] = useCreateExpenseMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    let amount = Math.round(Number(cost) * 100) / 100;
    let dt = new Date();
    if (date.slice(-2) > dt.getDate()) {
      toast.error("Please don't select future date");
      return;
    }
    try {
      await createExpense({
        empName,
        empId,
        projName,
        projId,
        billProof,
        amount,
        description,
        date,
      });
      navigate('/');
      toast.success('Expense Created Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>

      <FormContainer>
        <h1>Add Expense</h1>
        <Form onSubmit={submitHandler}>
          {/* <Form.Group className="my-2" controlId="empName">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Employee Name"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="empId">
          <Form.Label>Employee Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Employee Id"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            required
          ></Form.Control>
        </Form.Group> */}

          <Form.Group className="my-2" controlId="projName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Project Name"
              value={projName}
              onChange={(e) => setProjName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="projId">
            <Form.Label>Project Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Project Id"
              value={projId}
              onChange={(e) => setProjId(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="billProof">
            <Form.Label>Bill Proof</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Bill Proof"
              value={billProof}
              onChange={(e) => setbillProof(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="cost">
            <Form.Label>Amount(₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Bill Amount"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button disabled={isLoading} type="submit" variant="primary">
            Add Expense
          </Button>

          {isLoading && <Loader />}
        </Form>
      </FormContainer>
    </>
  );
};

export default ExpenseForm;
