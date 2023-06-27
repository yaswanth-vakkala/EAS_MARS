import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useAddProjectMutation } from '../../slices/projectsApiSlice';
import { toast } from 'react-toastify';

const ProjectFormScreen = () => {
  const [projName, setProjName] = useState('');
  const [projId, setProjId] = useState('');

  const navigate = useNavigate();

  const [addProject, { isLoading }] = useAddProjectMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await addProject({
        projName,
        projId,
      });
      toast.success('Project Created Successfully');
      navigate('/admin/projectlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <Link to="/admin/projectlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Add Project</h1>
        <Form onSubmit={submitHandler}>
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

          <Button
            disabled={isLoading}
            type="submit"
            variant="primary"
            className="my-2"
          >
            Add Project
          </Button>

          {isLoading && <Loader />}
        </Form>
      </FormContainer>
    </>
  );
};

export default ProjectFormScreen;
