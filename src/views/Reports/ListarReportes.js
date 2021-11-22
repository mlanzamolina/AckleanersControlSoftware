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

const ListarReportes = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [dats, setDatos] = useState({
    Fecha: " ",
    Unidades: " ",

  });

  const handleInputChance = (event) => {
    console.log(event.target.value);
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
  };

  const [reportes, loading, error] = useCollectionData(
    collection(db, "Reportes"),
    { idField: "id" }
  );

  return (
    <>
      <div className="dropdown" style={{ float: "right" }}>
        <button class="dropbtn">Opciones</button>
        <div class="dropdown-content">
          <a href="/ListarReportes">Listar Reportes</a>
          <a href="/AgregarReportes">Agregar Reportes</a>
          <a href="/ModificarReportes">Modificar Reportes</a>
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
          <h1 className="tituloh1">Listar Ordenes</h1>
          <table className="ta" align="center">
            <thead>
              <tr className="ta">
                <th scope="col">Fecha </th>
                <th scope="col">Unidades</th>
              </tr>
            </thead>
            <tbody>
              {reportes
                ? reportes.map((item) => {
                  return (
                    <tr className="ta" key={item.id}>
                      <td>{item.Fecha}</td>
                      <td>{item.Unidades}</td>
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

export default ListarReportes;
