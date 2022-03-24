import React from "react";
import logo from "../../img/logo.png";
import Nav from "../NavAdmin";

export default function ListarUsuarios() {
  return (
    <div>
      <>
        <Nav />
        <div class="sidebar">
          <a href="/Usuarios">Usuarios</a>
          <a class="active" href="/ListarUsuarios">
            Listar Usuarios
          </a>
          <a href="/AgregarUsuarios">Agregar usuario</a>
          <a href="/ModificarUsuarios">Modificar usuario</a>
        </div>
        <div class="contentf">
          <h1 style={{ textAlign: "center" }}>
            Manage listar usuarios funciona
          </h1>
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
    </div>
  );
}
