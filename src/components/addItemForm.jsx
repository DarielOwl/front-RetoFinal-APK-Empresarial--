import { Container, Row, Col, Toast, Form, Button } from "react-bootstrap";
import { AppContext } from "./StateProvider";
import { useCookies } from "react-cookie";
import { useContext, useState, useEffect, useRef } from "react";

import React from "react";
//import { useState } from "react";
const HOST_API = "https://back-retofinal.herokuapp.com";

function AddItemForm() {
  const {
    showItemForm,
    toggleShow,
  } = useContext(AppContext);

  //Datos Cliente
  const [nombre, setNombre] = useState();
  const [celular, setCelular] = useState();
  const [documento, setDocumento] = useState();

  // Crear nuevo cliente
  const registrarCliente = (e) => {
    e.preventDefault();

    if (verificarCliente) {
      let request = {
        nombre: nombre,
        celular: celular,
        documentoID: documento,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      };

      //Hacemos el Post este path
      fetch(HOST_API + "/addCliente", requestOptions)
        .then((response) => response.json())
        .then((cliente) => {
          console.log(cliente);
        });
    }
    alert("Cliente Creado!");
    e.target.reset();
  };

  //Comprobar que no vayan datos vacios
  const verificarCliente = () => {
    if (nombre != undefined && celular != undefined && documento != undefined) {
      return true;
    }
    return false;
  };


  return (
    <Container className="mt-5">
      <Row
        id="addItem"
        className="d-flex justify-content-center align-items-center mt-5"
        noGutters
      >
        <Col md={4} sm={12}>
          <Toast
            className="myForm mt-5"
            show={showItemForm}
            onClose={toggleShow}
          >
            <Toast.Header>
              <h2>
                <strong className="mr-auto">Nuevo Cliente</strong>
              </h2>
              <hr />
            </Toast.Header>

            <Toast.Body>
              <Form onSubmit={registrarCliente}>
                <Form.Row>
                  <Form.Group as={Col} md={12} sm={12}>
                    <Form.Label>Documento Identidad</Form.Label>
                    <Form.Control
                      placeholder="Documento"
                      onChange={(event) => {
                        setDocumento(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md={12} sm={12}>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      placeholder="Nombre"
                      onChange={(event) => {
                        setNombre(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md={12} sm={12}>
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                      placeholder="Celular"
                      onChange={(event) => {
                        setCelular(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form.Row>

                <Button variant="dark" type="submit">
                    Crear
                </Button>
              </Form>
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
}

export default AddItemForm;
