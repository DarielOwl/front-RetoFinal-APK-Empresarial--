import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "./StateProvider";
import { useHistory } from "react-router-dom";

function ViewShoppingList() {
  const { toggleShow, list } = useContext(AppContext);
  const history = useHistory();

  return (
    <Container>
      <Row xs="auto"
        className="d-flex justify-content-center align-items-center mt-5"
        noGutters
      >
        <Col sm={12} md={8}>
          <h3>Menu Principal</h3>
          <hr />
        </Col>
        <Col md={2} sm={12}></Col>

        <Col md={2} sm={12}>
          <Nav fill className="togglebutton">
            <Nav.Item onClick={toggleShow}>
              <Button variant="dark" type="submit">
                Añadir Cliente
              </Button>
            </Nav.Item>
          </Nav>
        </Col>
        
        <Col md={2} sm={12}>
          <Nav fill className="togglebutton">
            <Nav.Item onClick={toggleShow}>
              <Button variant="dark" type="submit">
                Añadir Proveedor
              </Button>
            </Nav.Item>
          </Nav>
        </Col>




      </Row>
    </Container>
  );
}

export default ViewShoppingList;
