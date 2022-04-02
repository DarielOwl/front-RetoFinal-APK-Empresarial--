import { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { AppContext } from "./StateProvider";
import { Link, useHistory, useLocation } from "react-router-dom";

//import logo from "./../logo.svg";
import logoF from "../assets/img/logoF.png";

function NavBar() {
  const location = useLocation();

  const { state, setState, handleRemoveCookie, paths } = useContext(AppContext);

  const history = useHistory();

  const logout = () => {
    handleRemoveCookie("user");
    setState((prev) => {
      return {
        ...prev,
        isLoggedIn: false,
      };
    });
    history.push("/home");
  };


  return (
    <>
      <Container>
        {!paths.includes(location.pathname) && (
          <Navbar expand="lg" fixed="top" bg="dark" variant="light">
            <Navbar.Brand href="/home">
              <img
                src={logoF}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
              Gestor Ferreteria
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="mr-3"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              {!state.isLoggedIn ? (
                <Nav className="ml-auto">
                  <Nav.Item>
                    <Link to="/login">Login |</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/register">Register</Link>
                  </Nav.Item>
                </Nav>
              ) : (
                <Nav className="ml-auto">
                  <Nav.Item>
                    <Link to="/dashboard">My Todos |</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="#" onClick={logout}>
                      Logout
                    </Link>
                  </Nav.Item>
                </Nav>
              )}
            </Navbar.Collapse>
          </Navbar>
        )}
      </Container>
    </>
  );
}

export default NavBar;
