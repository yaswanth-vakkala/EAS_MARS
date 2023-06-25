import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import SearchBox from '../../components/SearchBox';

const UserListScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, refetch, isLoading, error } = useGetUsersQuery({
    keyword,
    pageNumber,
  });

  const [deleteUser] = useDeleteUserMutation();

  let index = 0;
  function findIndex(i) {
    let row_index = i + 1;
    let serNum =
      process.env.REACT_APP_USERS_PAGINATION_LIMIT * (data.page - 1) +
      row_index;
    index++;
    return serNum;
  }

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        toast.success('User Deleted Successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <Container>
        <Row>
          <Col md="6">
            {keyword && (
              <Link to="/admin/userlist" className="btn btn-light my-2">
                Go Back
              </Link>
            )}
            {!keyword && (
              <Link to={'/admin/addUser'}>
                <Button variant="primary" className="my-2">
                  Add User
                </Button>
              </Link>
            )}
          </Col>
          <Col className="my-2" md="6">
            <SearchBox />
          </Col>
        </Row>
      </Container>
      <h1>Users</h1>
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
                <th>Admin</th>
                <th>Employee Id</th>
                <th>User Type</th>
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
                  <td>
                    {user.userType === 'Admin' ? (
                      <FaCheck style={{ color: '#00FF00' }} />
                    ) : (
                      <FaTimes style={{ color: '#FF0000' }} />
                    )}
                  </td>
                  <td>{user.userId}</td>
                  <td>{user.userType}</td>
                  <td
                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                  >
                    <>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        disabled={isLoading}
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: '#FFFFFF' }} />
                      </Button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default UserListScreen;
