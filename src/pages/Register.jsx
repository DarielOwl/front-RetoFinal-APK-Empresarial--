import { useState, useRef } from "react";
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
import { Link, useHistory } from "react-router-dom";

import logo from "./../logo.svg";

function Register() {
  // Component states
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleFormData = (e) => {
    e.preventDefault();
    setField(e.target.name, e.target.value);
  };

  const setField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const findFormErrors = () => {
    const { email, password, confirmPassword } = formData;
    const newErrors = {};
    console.log(email.indexOf("@"));
    // email
    if (!email || email === "") newErrors.email = "Email must not be blank";
    else if (email.indexOf("@") === -1 || email.indexOf(".") === -1)
      newErrors.email = "Please enter a valid email";

    // password errors
    if (!password.trim() || password.trim().length < 8)
      newErrors.password = "Password must be 8 characters or more!";

    // Confirm password errors
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match!";

    return newErrors;
  };

  const registerUser = (e) => {
    e.preventDefault();

    // geterrors
    const newErrors = findFormErrors();

    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
      return false;
    }

    // create new user object and send it to api
    const newuser = {
      email: formData.email,
      password: formData.password,
    };

    fetch(`https://user-manager-three.vercel.app/api/user/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newuser),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          alert(result.message);
          return true;
        }
        setFormData({});
        setErrors({});
        alert("Registration successful");
        history.push("/login");
      })
      .catch((err) => {
        console.log("this error occurred", err);
        alert(err.message);
      });
  };
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
              <Form noValidate onSubmit={registerUser}>
                <Form.Row>
                  {/* Email */}
                  <Form.Group as={Col} sm={12}>
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        required
                        isInvalid={!!errors.email}
                        placeholder="Enter email"
                        name="email"
                        id="email"
                        ref={emailRef}
                        onBlur={handleFormData}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                {/* Password row */}
                <Form.Row>
                  <Form.Group as={Col} md={6} sm={12}>
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        required
                        isInvalid={!!errors.password}
                        ref={passwordRef}
                        onBlur={handleFormData}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md={6} sm={12}>
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        isInvalid={!!errors.confirmPassword}
                        ref={confirmPasswordRef}
                        onBlur={handleFormData}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
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
