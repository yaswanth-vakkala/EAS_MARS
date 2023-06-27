import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useCreateExpenseReportMutation } from '../slices/expensesApiSlice';

const ExpenseReportScreen = () => {
  const dt = new Date();
  const currentMonth = dt.getMonth() + 1;
  let edate = new Date(dt.getFullYear(), currentMonth, 0);
  edate = edate.getDate();
  edate = dt.getFullYear() + '-' + currentMonth + '-' + edate;
  const sdate = dt.getFullYear() + '-' + currentMonth + '-' + 1;

  const [getExpenseReport, { isLoading, error }] =
    useCreateExpenseReportMutation();
  const [firstDay, setFirstDay] = useState(sdate);
  const [lastDay, setLastDay] = useState(edate);
  const [report, setReport] = useState('');

  // useEffect(() => {
  //   const res = getExpenseReport({ firstDay, lastDay });
  //   console.log(res);
  //   setReport(res);
  // }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await getExpenseReport({ firstDay, lastDay });
      setReport(res);
      toast.success('Report generated Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <FormContainer>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <h1>Get report for a date range</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="sdate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={firstDay}
                  onChange={(e) => setFirstDay(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="edate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={lastDay}
                  onChange={(e) => setLastDay(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="my-3">
                Get report
              </Button>
            </Form>
            {report && (
              <Card style={{ width: '25rem' }}>
                <Card.Body>
                  <Card.Title>
                    Total Expenses Cost:{' '}
                    <span style={{ color: '#000000' }}>
                      {' '}
                      {report && report.data[0].totalExpenseCost}
                    </span>{' '}
                    rupees
                  </Card.Title>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ExpenseReportScreen;
