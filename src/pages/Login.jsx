import {
  Container,
  Row,
  Col,
  Toast,
  Form,
  Button,
  Image,
} from "react-bootstrap";


import { Link } from "react-router-dom";

import logo from "../assets/img/logoF.png";

//Dependencias de Firebase
import firebaseApp from "../firebase/credencial";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Login() {


  //const firestore = getFirestore(firebaseApp);

  //Loging con Firebase
  function submitHandlerLogin(e) {
    
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    //const rol = e.target.elements.rol.value;

    signInWithEmailAndPassword(auth, email, password)  
     .then((userCredential) => {
      // Iniciar Sesion
      const user = userCredential.user;
      let email = user.email;
      
      let usuario ={
        email: user.email,
        usuario: email.split("@")[0],
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //window.alert("Error : " + errorMessage);
    });
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
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Toast className="myForm">
            <Row className="myForm-header">
              <Col sm={8}>
                <h2>
                  <i
                    className="fas fa-sign-in-alt icon"
                    arial-hidden="true"
                  ></i>
                  <strong>Inicio Sesion</strong>
                </h2>
              </Col>
              <Col sm={4}>
                <span>
                  <Image fluid src={logo} className="formLogo" />
                </span>
              </Col>
            </Row>
            <hr />
            
            <Toast.Body>
              <Form onSubmit={submitHandlerLogin}>
                <Form.Group>
                  {/* Email */}
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    id="email"
                  />
                </Form.Group>

                <Form.Group>
                  {/* Email */}
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  Login
                </Button>
              </Form>

              <p>
                ¿Aun no estas Registrado? <Link to="/register">Click Aqui</Link>
              </p>
            </Toast.Body>
          </Toast>
        </Col>
        <Col md={2} sm={12}></Col>
      </Row>
    </Container>
  );
}

export default Login;
