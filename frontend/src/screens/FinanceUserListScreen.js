import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { LuIndianRupee } from 'react-icons/lu';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import FinanceDepartmentSearchBox from '../components/FinanceDepartmentSearchBox';
const FinanceUserListScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, refetch, isLoading, error } = useGetUsersQuery({
    keyword,
    pageNumber,
  });

  let index = 0;
  function findIndex(i) {
    let row_index = i + 1;
    let serNum =
      process.env.REACT_APP_USERS_PAGINATION_LIMIT * (data.page - 1) +
      row_index;
    index++;
    return serNum;
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <Container>
        <Row>
          <Col md="6">
            {keyword && (
              <Link to="/userlist" className="btn btn-light my-2">
                Go Back
              </Link>
            )}
          </Col>
          <Col className="my-2" md="6">
            <FinanceDepartmentSearchBox />
          </Col>
        </Row>
      </Container>
      <h1>Users List</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : data.users.length === 0 ? (
        <Message variant="danger">No Users found</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>S.No</th>
                <th>Database Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Employee Id</th>
                <th>User Type</th>
                <th>Admin</th>
                <th>Balance Amount(₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user._id} style={{ textAlign: 'center' }}>
                  <td>{findIndex(index)}</td>
                  <td>{user._id}</td>
                  <td>{user.firstName + ' ' + user.lastName}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.userId}</td>
                  <td>{user.userType}</td>
                  <td>
                    {user.userType === 'Admin' ? (
                      <FaCheck style={{ color: '#00FF00' }} />
                    ) : (
                      <FaTimes style={{ color: '#FF0000' }} />
                    )}
                  </td>
                  <td>{user.amount}</td>
                  <td
                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                  >
                    <>
                      <LinkContainer to={`/user/${user._id}/addMoney`}>
                        <Button variant="success" className="btn-sm">
                          <LuIndianRupee />
                        </Button>
                      </LinkContainer>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isFinanceDepartment={true}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default FinanceUserListScreen;
