import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <h2>User Profile</h2>
      <Table responsive hover bordered striped>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Type</th>
            <th>Email</th>
            <th>Employee Id</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ textAlign: 'center' }}>
            <td>{userInfo.firstName}</td>
            <td>{userInfo.lastName}</td>
            <td style={{ color: '#3F00FF' }}>{userInfo.userType}</td>
            <td>{userInfo.email}</td>
            <td>{userInfo.userId}</td>
          </tr>
        </tbody>
      </Table>
      <div>
        <Link to={`/userProfile/${userInfo._id}/edit`}>
          <Button variant="primary" className="my-2 mx-2">
            Edit Profile
          </Button>
        </Link>
        {/* <Link to={`/user/${userInfo._id}/editPassword`}>
          <Button variant="warning" className="my-2 mx-2">
            Edit Password
          </Button>
        </Link> */}
      </div>
    </>
  );
};

export default ProfileScreen;
