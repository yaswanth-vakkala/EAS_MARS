import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { useGetUserProfileQuery } from '../slices/usersApiSlice';

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, refetch, isLoading, error } = useGetUserProfileQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h2>User Profile</h2>
          <Table responsive hover bordered striped>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Type</th>
                <th>Balance Amount(₹)</th>
                <th>Email</th>
                <th>Employee Id</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: 'center' }}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td style={{ color: '#3F00FF' }}>{data.userType}</td>
                <td>{data.amount}</td>
                <td>{data.email}</td>
                <td>{data.userId}</td>
              </tr>
            </tbody>
          </Table>
          <div>
            {/* <Link to={`/userProfile/${userInfo._id}/edit`}>
              <Button variant="primary" className="my-2 mx-2">
                Edit Profile
              </Button>
            </Link> */}
            {/* <Link to={`/user/${userInfo._id}/editPassword`}>
          <Button variant="warning" className="my-2 mx-2">
            Edit Password
          </Button>
        </Link> */}
          </div>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
