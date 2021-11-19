import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./PasswordRecovery.css";

export default function Login() {
  const [user, setUser] = useState("");

  function handleSubmit() {
      

    console.log(user);

    
      
        if (/^\w+([.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(user)) {
            
            alert("conexion a firebase y link de recupercaion");

         
        }else{
          alert("Ingrese un correo.");
        }
      
    
   }

   
    return (
      
      <div className="wrapper">
      <div className="form-wrapper">
      <h1>Recuperación de Contraseña</h1>
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
             
              <div>
              </div>
              <div className="createAccount">
                <button onClick={handleSubmit}>Mandar un correo</button>
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
              <Link to="/">Home</Link>
              </div>
              </form> 
      </div>
      </div>
    );
  }
    