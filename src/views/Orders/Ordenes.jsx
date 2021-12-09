import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../img/logo.png";
import Nav from "../NavAdmin";

export default function Ordenes() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <Nav></Nav>
      <div class="sidebar">
        <a class="active" href="/Ordenes">
          Ordenes
        </a>
        <a href="/ListarOrdenes">Listar ordenes</a>
        <a href="/AgregarOrden">Agregar ordenes</a>
        <a href="/ModificarOrden">Modificar ordenes</a>
      </div>
      <div class="contentf">
        <h1 style={{ textAlign: "center" }}>Herramienta de ordenes</h1>
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
      </div>
    </>
  );
}
