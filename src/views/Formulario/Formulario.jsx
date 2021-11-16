import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Fab } from "@material-ui/core";
import logo from "../../img/logo.png";

const Formulario = () => {
  const [dats, setDatos] = useState({
    nombre: " ",
    id: " ",
    numero: " ",
    correo: " ",
  });

  const handleInputChance = (event) => {
    console.log(event.target.value);
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
      // [event.target.dni] : event.target.value,
      // [event.target.number] : event.target.value,
      // [event.target.email] : event.target.value
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    console.log(
      dats.nombre + " " + dats.id + " " + dats.numero + " " + dats.correo
    );
  };

  return (
    <Fragment>
      <a href="/">
        <img
          src={logo}
          alt="logo ackleaners"
          width="250"
          style={{
            margin: 0,
            top: "auto",
            left: 45,
            top: 40,
            position: "fixed",
          }}
        />
      </a>
      <div>
        <h1 className="tituloh1">Registro Empleado</h1>
      </div>

      <form className="col-md" onSubmit={enviarDatos}>
        <div >
          <h3>Nombre Completo: </h3>
          <input
            placeholder="Ingrese Nombre"
            className="form-control"
            name="nombre"
            onChange={handleInputChance}
          ></input>
        </div>
        <div>
          <h3>ID: </h3>
          <input
            placeholder="Ingrese número de identidad"
            className="form-control"
            type="text"
            name="id"
            onChange={handleInputChance}
          ></input>
        </div>
        <div>
          <h3>No. Contacto: </h3>
          <input
            placeholder="Ingrese número de Telefono/celular"
            className="form-control"
            type="text"
            name="numero"
            onChange={handleInputChance}
          ></input>
        </div>
        <div>
          <h3>Correo Electronico: </h3>
          <input
            placeholder="ejemplo.123@ejemplo.com"
            className="form-control"
            type="text"
            name="correo"
            onChange={handleInputChance}
          ></input>
        </div>
        <div>
          <Link to="/">
            <button type="submit" class="btn btn-danger">
              Cancelar
            </button>
          </Link>

          <button type="submit" class="btn btn-primary">
            Registrar
          </button>
        </div>
      </form>
      {/* <h3>{dats.nombre}-{dats.id}-{dats.numero}-{dats.correo}</h3> */}
    </Fragment>
  );
};

export default Formulario;
