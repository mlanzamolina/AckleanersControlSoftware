import React, { useState } from "react";
import {
  db,
  registerWithEmailAndPassword,
} from "../../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./estilo.css";
import logo from "../../img/logo.png";

const AgregarUsuarios = () => {
  const userCollectionRef = collection(db, "Usuarios");

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contra, setContra] = useState("");
  const [contra1, setContra1] = useState("");

  const add = async () => {
    if (contra === contra1) {
      await addDoc(userCollectionRef, {
        Nombre: nombre,
        ID: correo,
        Correo: correo,
        Numero: telefono,
        Tipo: "Cliente",
      }).catch((error) => {
        console.log(error);
      });
      registerWithEmailAndPassword(nombre, correo, contra);
      window.location.assign("/Login");
      alert("Usuario Creado");
    } else {
      alert("Las contraseñas deben coincidir");
    }
  };

  return (
    <div className="wrapperC">
      <div className="containerC">
        <form id="signup" onSubmit={(e) => add(e.preventDefault())}>
          <div class="header">
            <h3>Crear Usuario</h3>
          </div>

          <div class="sep"></div>

          <div class="inputs">
            <h5>Ingrese nombre</h5>
            <input
              type="text"
              value={nombre}
              autofocus
              name="nombre"
              onChange={(e) => setNombre(e.target.value)}
            />

            <h5>Ingrese Telefono</h5>
            <input
              type="text"
              name="telefono"
              autofocus
              onChange={(e) => setTelefono(e.target.value)}
              pattern="[0-9]{8}"
              title="numero 8 digitos sin nada extra"
              value={telefono}
            />
            <h5>Ingrese Correo Electronico</h5>
            <input
              type="email"
              name="correo"
              autofocus
              onChange={(e) => setCorreo(e.target.value)}
              value={correo}
            />

            <h5>Ingrese Contraseña</h5>
            <input
              type="password"
              name="contra"
              placeholder="Debe contener al menos 6 caracteres"
              onChange={(e) => setContra(e.target.value)}
              value={contra}
            />

            <h5>Confirmar Contraseña</h5>
            <input
              type="password"
              name="contra1"
              onChange={(e) => setContra1(e.target.value)}
              value={contra1}
            />

            <button id="submit" type="submit">
              Registrar Usuario
            </button>
          </div>
        </form>
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
    </div>
  );
};
export default AgregarUsuarios;
