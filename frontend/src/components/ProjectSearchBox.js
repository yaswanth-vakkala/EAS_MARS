import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProjectSearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (userInfo.userType === 'Admin') {
      if (keyword) {
        navigate(`/admin/projectlist/search/${keyword.trim()}`);
        setKeyword('');
      } else {
        navigate('/admin/projectlist');
      }
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder={'Search Projects using Project Id...'}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default ProjectSearchBox;
