import { Container, Row, Col, Card } from "react-bootstrap";

function NotFound() {
  return (
    <main>
      <Container>
        <Row className="d-flex justify-content-center align-items-center" noGutters>
          <Col md={2}></Col>
          <Col sm={12} md={8}>
            <Card className="card">
              <Card.Body>
                <h1>Lost In The Desert 
                    <i className="fas fa-question-circle infinite-rotate icon" aria-hidden="true"></i></h1>
                <hr />
                It looks like you have missed your way. Let's get you back home.
                <Card.Link href="/">Go back home</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </main>
  );
}

export default NotFound;
