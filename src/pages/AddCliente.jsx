import React from "react";
import { useState } from "react";
const HOST_API = "https://back-retofinal.herokuapp.com";

function AddCliente() {
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
        documentoID: ci,
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
    e.target.reset();
  };

  //Comprobar que no vayan datos vacios
  const verificarCliente = () => {
    if (nombre != undefined && celular != undefined && ci != undefined) {
      return true;
    }
    return false;
  };

  return (
    <>
      <h1>Añadir Cliente</h1>
      <form onSubmit={registrarCliente} className="gestionFrom">
        <table>
          <tr>
            <td>
              {" "}
              <label>Nombre: </label>
            </td>
            <td>
              <input
                onChange={(event) => {
                  setNombre(event.target.value);
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <label>Celular: </label>
            </td>
            <td>
              <input
                onChange={(event) => {
                  setCelular(event.target.value);
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label>C.I: </label>{" "}
            </td>
            <td>
              {" "}
              <input
                onChange={(event) => {
                  setCI(event.target.value);
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button className="btn btn-primary" type="submit">
                Crear Cliente
              </button>{" "}
            </td>
          </tr>
        </table>
      </form>
    </>
  );
}

export default GestionCliente;
