import {Link} from 'react-router-dom';

import { Row, Col, Container, Button } from "react-bootstrap";
import Carosel from "./carosel";

function About() {
  const styleObject = {
    divBg: {
      backgroundColor: "#ddd",
    },
    textAlign:{
        textAlign:"right"
    },
    h1:{
        color:"darkGreen",
        fontWeight:"bold"
    }
  };
  const aboutImages = [
    { src: "/images/Green-background.jpg", alt: "Landscape" },

    { src: "/images/board.jpg", alt: "List Bbard" },
  ];

  return (
    <Container style={styleObject.divBg} fluid>
      <Row className="p-4">
        <Col sm={12} md={6} style={styleObject.textAlign}>
          <h1 style={styleObject.h1}>TODOs Manager</h1>
          <p>
            Quickly maintain your todos here. You can have this in your
            pocket and always view it from anywhere and at anytime.
          </p>
          <p>
              <Link to="/register">
              <Button variant="success">Start here</Button>
              </Link>
        
          </p>
        </Col>
        <Col sm={12} md={6}>
          <Carosel items={aboutImages} id="heroCarosel" />
        </Col>
      </Row>
    </Container>
  );
}

export default About;
