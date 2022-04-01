import React, { useState } from "react";

//React Router
import { Link } from "react-router-dom";

//Css React
import {
  Container,
  Row,
  Col,
  Toast,
  Form,
  Button,
  Image,
  InputGroup,
} from "react-bootstrap";

import logo from '../assets/img/logoF.png'

//Dependencias de Firebase
import firebaseApp from "../firebase/credencial";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Register() {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    console.log("submit", email, password, rol);

    if(password.length<6){
      window.alert("nop");
      return false;
    }

    if (isRegistrando) {
      // registrar
      registrarUsuario(email, password, rol);
    } else {
      // login
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <Container>
      <Row
        className="d-flex justify-content-center align-items-center main"
        noGutters
      >
        <Col md={2} sm={12}></Col>
        <Col
          sm={12}
          md={8}
          className="d-flex justify-content-center align-items-center"
        >
          <Toast className="myForm">
            <Row className="myForm-header">
              <Col sm={8}>
                <h2>
                  <i className="fas fa-user icon" arial-hidden="true"></i>
                  <strong>Register</strong>
                </h2>
              </Col>
              <Col sm={4}>
                <span>
                  <Image fluid src={logo} className="formLogo" />
                </span>
              </Col>
            </Row>
            <hr />

            {/* Form here */}
            <Toast.Body>
              <Form>
                <Form.Row>
                  
                  {/* Email */}
                  <Form.Group as={Col} sm={12}>
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="email"
                        required
                        placeholder="Enter email"
                        name="email"
                        id="email"
                        onBlur={submitHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                {/* Password */}
                <Form.Row>
                  <Form.Group as={Col} md={6} sm={12}>
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        onBlur={submitHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                {/* Submit button */}
                <Button variant="success" type="submit">
                  Register
                </Button>
              </Form>

              <p>
                Already registered? <Link to="/login">Login Here</Link>&nbsp; |
                &nbsp;
                <Link to="/home">Home</Link>
              </p>
            </Toast.Body>
          </Toast>
        </Col>
        <Col md={2} sm={12}></Col>
      </Row>
    </Container>
  );
}

export default Register;
