import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../img/logo.png"

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function handleSubmit() {
      
    console.log(pass);
    console.log(user);

    
      
        if (/^\w+([.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(user)) {
          if (pass === null) {
            alert("Ingrese Contraseña.");
          } else {
            if (pass === "") {
              alert("Ingrese Contraseña.");
            }else{
              alert("bienvenido =)");
            }
          }

         
        }else{
          alert("Ingrese un correo.");
        }
      
    
   }

   
    return (
      
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
              <div>
                <div>
                  <small>
                    ¿No tiene una cuenta?
                    <Link to="/CrearUsuario">
                      {" "}
                      Registrarse
                    </Link>
                  </small>
                </div>
              </div>
              </div>
              </form> 
              <a href="/"><img src={logo} alt="logo ackleaners" width="250" style={{
              margin: 0,
              top: "auto",
              right: 45,
              bottom: 40,
              position: "fixed",
            }}/></a> 
      </div>
      </div>
    );
  }
    


