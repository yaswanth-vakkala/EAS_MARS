import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from '../../slices/projectsApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import ProjectSearchBox from '../../components/ProjectSearchBox';

const ProjectListScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, refetch, isLoading, error } = useGetProjectsQuery({
    keyword,
    pageNumber,
  });

  const [deleteProject] = useDeleteProjectMutation();

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
    if (window.confirm('Are you sure to delete the project?')) {
      try {
        await deleteProject(id);
        toast.success('Project Deleted Successfully');
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
              <Link to="/admin/projectlist" className="btn btn-light my-2">
                Go Back
              </Link>
            )}
            {!keyword && (
              <Link to={'/admin/addProject'}>
                <Button variant="primary" className="my-2">
                  Add Project
                </Button>
              </Link>
            )}
          </Col>
          <Col className="my-2" md="6">
            <ProjectSearchBox />
          </Col>
        </Row>
      </Container>
      <h1>Projects List</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : data.projects.length === 0 ? (
        <Message variant="danger">No Projects found</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>S.No</th>
                <th>Database Id</th>
                <th>Project Name</th>
                <th>Project Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((project) => (
                <tr key={project._id} style={{ textAlign: 'center' }}>
                  <td>{findIndex(index)}</td>
                  <td>{project._id}</td>
                  <td>{project.projName}</td>
                  <td>{project.projId}</td>
                  <td
                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                  >
                    <>
                      <LinkContainer to={`/admin/project/${project._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        disabled={isLoading}
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(project._id)}
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
            isProject={true}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default ProjectListScreen;
