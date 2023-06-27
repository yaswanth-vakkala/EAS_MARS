import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
// import SearchBox from './SearchBox';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Expense Approval System</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={userInfo.firstName + ' ' + userInfo.lastName}
                    id="username"
                  >
                    <LinkContainer to="/">
                      <NavDropdown.Item>Home</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/user/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    {userInfo && userInfo.userType !== 'Admin' && (
                      <LinkContainer to="user/history">
                        <NavDropdown.Item>Expenses History</NavDropdown.Item>
                      </LinkContainer>
                    )}

                    {/* Higher User Links */}
                    {userInfo && userInfo.userType !== 'Employee' && (
                      <LinkContainer to="/expense/report">
                        <NavDropdown.Item>Expenses Report</NavDropdown.Item>
                      </LinkContainer>
                    )}
                    {/* FinanceDepartment Links */}
                    {userInfo && userInfo.userType === 'FinanceDepartment' && (
                      <LinkContainer to="/userlist">
                        <NavDropdown.Item>Add Money</NavDropdown.Item>
                      </LinkContainer>
                    )}

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser size={'1.1em'} /> Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.userType === 'Admin' && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/projectlist">
                    <NavDropdown.Item>Projects</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
