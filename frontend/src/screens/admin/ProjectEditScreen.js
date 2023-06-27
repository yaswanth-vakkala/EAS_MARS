import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetProjectDetailsQuery,
  useUpdateProjectMutation,
} from '../../slices/projectsApiSlice';

const ProjectEditScreen = () => {
  const { id: projectId } = useParams();
  const [projName, setProjName] = useState('');
  const [projId, setProjId] = useState('');

  const {
    data: project,
    isLoading,
    error,
    refetch,
  } = useGetProjectDetailsQuery(projectId);

  const navigate = useNavigate();

  const [updateProject, { isLoading: loadingUpdate }] =
    useUpdateProjectMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProject({
        projectId,
        projName,
        projId,
      });
      toast.success('Project Updated Successfully');
      refetch();
      navigate('/admin/projectlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (project) {
      setProjName(project.projName);
      setProjId(project.projId);
    }
  }, [project]);

  return (
    <>
      <Link to="/admin/projectlist" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Project Details</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
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

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProjectEditScreen;
