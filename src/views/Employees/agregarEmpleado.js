import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import { dbEmpleado } from "../../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import swal from "sweetalert";
import { Interfaz } from "./empleadoNav"
import "./estiloEmpleado.css"

const AgregarEmpleado = () => {
  const tablaEmpleadosRef = collection(dbEmpleado, "Empleados");

  const [dats, setDatos] = useState({
    nombre: " ",
    dni: " ",
    numero: " ",
    correo: " ",
    direccion: " ",
    estado: "ACTIVO",
    foto: " "
  });

  const handleInputChance = (event) => {
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (dats.nombre == " " || dats.numero == " " || dats.id == " " || dats.correo == " ") {
      swal({
        title: "No se realizo",
        text: "No se agregro el empleado, verifique los campos",
        icon: "warning",
        button: "aceptar"
      });

    }
    else {
      await addDoc(tablaEmpleadosRef, {
        nombre: dats.nombre,
        dni: dats.dni,
        n_telefono: dats.numero,
        correo: dats.correo,
        estado: dats.estado,
        direccion: dats.direccion,
        foto: dats.foto
      });
      swal({
        title: "Realizado",
        text: "Se agregro el empleado",
        icon: "info",
        button: "aceptar"
      });
    }
  };

  return (
    <Fragment>
      <Interfaz />
      <div className="w-100 p-3 h-100 contenedorPrincipal">
        <div className="container rounded contenedorFormulario">
          <div>
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputAddress" className="form-label letrasFormulario" style={{ "marginTop": "5%" }}>Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Eje. Carlos Flores"
                  name="nombre"
                  onChange={handleInputChance}
                  required
                ></input>
              </div>
              <div className="col-md-6">
                <label for="inputAddress" className="form-label letrasFormulario" style={{ "marginTop": "5%" }}>Correo electronico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Eje. test@mail.com"
                  onChange={handleInputChance}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  title="Formato: ejemplo.123@ejemplo.com"
                  name="correo"
                  autoFocus
                  required
                ></input>
              </div>
              <div className="col-5">
                <label for="inputAddress" className="form-label letrasFormulario">DNI</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Eje. 1804198002033"
                  name="dni"
                  pattern="[0-9]{13}"
                  title="Numero 13 digitos sin guiones"
                  onChange={handleInputChance}
                  autoFocus
                  required
                ></input>
              </div>
              <div class="col-5">
                <label for="inputAddress" class="form-label letrasFormulario">N.Telefono</label>
                <input
                  type="text"
                  class="form-control"
                  name="numero"
                  placeholder="Eje. 9940-1110"
                  pattern="[0-9]{8}"
                  title="Numero 8 digitos sin nada extra"
                  onChange={handleInputChance}
                  required
                ></input>
              </div>
              <div class="col-md-10">
                <label for="exampleFormControlTextarea1" class="letrasFormulario" >Direccion</label>
                <textarea
                  class="form-control"
                  style={{ "resize": "none" }}
                  name="direccion"
                  rows="3"
                  onChange={handleInputChance}
                  required
                ></textarea>

              </div>

              <div class="col-3 offset-lg-4 foto">

              </div>
              <div class="offset-lg-4">
                <button type="button" class="btn btn-secondary btn-sm">Agregar Foto</button>
              </div>
              <div class="col-12 offset-lg-7">

                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ "marginBottom": "3%", "marginRight": "2%" }}
                  onClick={(e) => handleSubmit(e.preventDefault())}
                >
                  Registrar Empleado
                </button>

                <Link to="/">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    style={{ "marginBottom": "3%" }}
                  >Cancelar</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AgregarEmpleado;
