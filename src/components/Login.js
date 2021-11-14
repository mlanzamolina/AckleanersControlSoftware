import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");



  function handleSubmit() {
      
    console.log(pass);
    console.log(user);

    if (pass === null) {
      alert("Ingrese Contraseña.");
    } else {
      if (pass === "") {
        alert("Ingrese Contraseña.");
      } else {
        if (/^\w+([.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(user)) {
         
          alert("bienvenido =)");
          navigate("/");
         
        }else{
          alert("Ingrese un correo.");
        }
      }
    }
   }

   
    return (
      <div>
      
          
            <h1>Iniciar Sesión</h1>
            
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
                  <a
                    className="clickable_text"
                    onClick={() => {
                      alert("hola1");
                    }}
                  >
                    ¿Olvidó su contraseña?
                  </a>
                </small>
              </div>
              <div className="createAccount">
                <button onClick={handleSubmit}>INICIAR SESIÓN</button>
              </div>
              <div>
                <div>
                  <small>
                    ¿No tiene una cuenta?
                    <a
                      className="clickable_text"
                      onClick={() => {
                        alert("hola2");
                       
                      }}
                    >
                      {" "}
                      Registrarse
                    </a>
                  </small>
                </div>
              </div>
            
      </div>
    );
  }
    


