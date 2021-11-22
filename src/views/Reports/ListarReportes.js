import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import "./Formulario.css";

const ListarReportes = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [dats, setDatos] = useState({
    nombre: " ",
    unidades: " ",
    descripcion: " ",
    fecha: " ",
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
      dats.nombre +
        " " +
        dats.unidades +
        " " +
        dats.descripcion +
        " " +
        dats.fecha
    );
  };
  const [ordenes, setOrdenes] = useState({
    results: [
      {
        nombre: "Rodrigo ",
        telefono: "9990-9999",
        cantidad_de_unidaes: "7",
        descipcion: "exelente producto",
        estado: "terminado",
      },

      {
        nombre: "Marco ",
        telefono: "9990-9999",
        cantidad_de_unidaes: "6",
        descipcion: "Exelente",
        estado: "proceso",
      },
    ],
  });

  return (
    <>
      <div className="dropdown" style={{ float: "right" }}>
        <button class="dropbtn">Opciones</button>
        <div class="dropdown-content">
          <a href="/ListarReportes">Listar Reporte</a>
          <a href="/ModificarReportes">Modificar Reporte</a>
          <a href="/AgregarReportes">Agregar Reporte</a>
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
          <h1 className="tituloh1">Listar Reportes</h1>
          <table className="ta" align="center">
            <thead>
              <tr className="ta">
                <th scope="col">Nombre del Cliente</th>
                <th scope="col">Unidades</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Telefono</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.results.map((item) => {
                return (
                  <tr className="ta">
                    <td>{item.nombre}</td>
                    <td>{item.cantidad_de_unidaes}</td>
                    <td>{item.descipcion}</td>
                    <td>{item.telefono}</td>
                    <td>{item.estado}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <h3>{dats.nombre}-{dats.id}-{dats.numero}-{dats.correo}</h3> */}
      </Fragment>
    </>
  );
};

export default ListarReportes;
