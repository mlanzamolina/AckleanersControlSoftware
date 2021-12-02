import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import { db } from "../..//components/firebase";
import logo from "../../img/logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import "./Formulario.css";

const ListarEmpleado = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
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
    });
  };

  const [empleados, loading, error] = useCollectionData(
    collection(db, "Empleados"),
    { idField: "id" }
  );

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
          <h1 className="tituloh1">Listar Empleado</h1>
          <table className="ta" align="center">
            <thead>
              <tr className="ta">
                <th scope="col">Nombre De Empleado</th>
                <th scope="col">DNI</th>
                <th scope="col">Numero de Telefono</th>
                <th scope="col">Correo Electronico</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {empleados
                ? empleados.map((item) => {
                    return (
                      <tr className="ta" key={item.id}>
                        <td>{item.nombre}</td>
                        <td>{item.dni}</td>
                        <td>{item.n_telefono}</td>
                        <td>{item.correo}</td>
                        <td>{item.estado}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </Fragment>
    </>
  );
};

export default ListarEmpleado;
