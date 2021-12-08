import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../img/logo.png";

export default function EmployeeNavigation() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="managementsidemenu">
        <Link to="#" className="managementmenu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>

        <div class="container">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="Reportes">
                    Lista de Empleados
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="AgregarEmpleado">
                    Agregar Empleado
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="ModificarEmpleado">
                    Modificar Empleado
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <nav
        className={sidebar ? "managementnav-menu active" : "managementnav-menu"}
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
    </>
  );
}
