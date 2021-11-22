import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import { dbEmpleado } from "../../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import swal from "sweetalert";

const AgregarEmpleado = () => {
  const [sidebar, setSidebar] = useState(false);
  const tablaEmpleadosRef = collection(dbEmpleado, "Empleados");
  const showSidebar = () => setSidebar(!sidebar);

  const [dats, setDatos] = useState({
    nombre: " ",
    id: " ",
    numero: " ",
    correo: " ",
    estado: "Activo"
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
    } else {
      await addDoc(tablaEmpleadosRef, {
        nombre: dats.nombre,
        dni: dats.id,
        n_telefono: dats.numero,
        correo: dats.correo,
        estado: dats.estado
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
    <>
      <div className="dropdown" style={{ float: "right" }}>
        <button class="dropbtn">Opciones</button>
        <div class="dropdown-content">
          <a href="/ListarEmpleado">Listar Empleado</a>
          <a href="/AgregarEmpleado">AgregarEmpleado</a>
          <a href="/ModificarEmpleado">ModificarEmpleado</a>
        </div>
      </div>
      <Fragment>
        <a href="/">
          <img
            src={logo}
            alt="logo ackleaners"
            width="250"
            style={{
              margin: 0,
              top: "auto",
              right: 45,
              bottom: 40,
              position: "fixed",
            }}
          />
        </a>
        <div className="managementsidemenu">
          <Link to="#" className="managementmenu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav
          className={
            sidebar ? "managementnav-menu active" : "managementnav-menu"
          }
        >
          <ul className="managementnav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="managementmenu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={`management${item.cName}`}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div>
          <h1 className="tituloh1">Registro Empleado</h1>
        </div>

        <form className="col-md">
          <div>
            <h3>Nombre Completo: </h3>
            <input
              placeholder="Ingrese Nombre"
              className="form-control"
              name="nombre"
              onChange={handleInputChance}
              required
            ></input>
          </div>
          <div>
            <h3>ID: </h3>
            <input
              placeholder="Ingrese número de identidad"
              className="form-control"
              type="number"
              name="id"
              onChange={handleInputChance}
              required
            ></input>
          </div>
          <div>
            <h3>No. Contacto: </h3>
            <input
              placeholder="Ingrese número de Telefono/celular"
              className="form-control"
              type="number"
              name="numero"
              onChange={handleInputChance}
              required
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
              required
            ></input>
          </div>
          <div>
            <Link to="/">
              <button type="submit" className="btn btn-danger">
                Cancelar
              </button>
            </Link>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Registrar
            </button>
          </div>
        </form>
      </Fragment>
    </>
  );
};

export default AgregarEmpleado;
