import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "./StateProvider";
import Item from "./item";

function ViewShoppingList() {
  const { toggleShow, list } = useContext(AppContext);
  // console.log(list);
  return (
    <Container>
      <Row
        className="d-flex justify-content-center align-items-center mt-5"
        noGutters
      >
        <Col md={2} sm={12}>
          <Nav fill className="togglebutton">
            <Nav.Item onClick={toggleShow}>
              <Button variant="success" type="submit">
                <i className="fas fa-plus icon" arial-hidden="true"></i>
              </Button>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12} md={8}>
          <h3>My Todos</h3>
          <hr />
          <div className="#view-items">
          {list.map((item,idx) => {
            return (
              <Item
                key={`${item.id} ${idx}`}
                itemID={item.id}
                title={item.title}
                description={item.description}
                completed={item.completed}
                toggleInput={toggleShow}
              />
            );
          })}
          </div>
        </Col>
        <Col md={2} sm={12}></Col>
      </Row>
    </Container>
  );
}

export default ViewShoppingList;
