import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../img/logo.png"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailAndPassword } from "../../components/firebase";
import swal from "sweetalert";
import Navigation from "../../components/navigation";

export default function Login() {
  const [usern, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [user, loading, error] = useAuthState(auth);

  function handleSubmit(e) {

    e.preventDefault();

    if (/^\w+([.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(usern)) {
      if (pass === null) {
        swal({
          title: "Campo Invalido.",
          text: "Por favor ingrese una contraseña.",
          icon: "warning",
          button: "Aceptar",
        });
      } else {
        if (pass === "") {
          swal({
            title: "Campo Invalido.",
            text: "Por favor ingrese una contraseña.",
            icon: "warning",
            button: "Aceptar",
          });
        } else {
          //alert("bienvenido =)");
          signInWithEmailAndPassword(usern, pass);
        }
      }


    } else {
      swal({
        title: "Campo Invalido.",
        text: "Por favor ingrese un correo.",
        icon: "warning",
        button: "Aceptar",
      });
    }


  }


  return (
    <>
      <Navigation />

      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Iniciar Sesión</h1>
          <form >
            <div className="login-form">
              <div className="email">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  placeholder="Correo"
                  type="email"
                  name="email"
                  noValidate
                  onChange={(e) => { setUser(e.target.value); }}
                />
              </div>


              <div className="password">
                <label htmlFor="password">Contraseña</label>
                <input
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  noValidate
                  onChange={(e) => { setPass(e.target.value); }}
                />
              </div>
              <div>
                <small>
                  <Link to="/passwordRecovery">¿Olvidó su contraseña?</Link>
                </small>
              </div>
              <div className="createAccount">
                <button onClick={handleSubmit}>INICIAR SESIÓN</button>
              </div>
              {/*}<div>
                <div>
                  <small>
                    ¿No tiene una cuenta?
                    <Link to="/AgregarUsuarios">
                      {" "}
                      Registrarse
                    </Link>
                  </small>
                </div>
              </div>{*/}
            </div>
          </form>
          <a href="/"><img src={logo} alt="logo ackleaners" width="12%" height="auto" style={{
            margin: 0,
            top: "auto",
            right: 45,
            bottom: 40,
            position: "fixed",
          }} /></a>
        </div>
      </div>
    </>
  );
}
