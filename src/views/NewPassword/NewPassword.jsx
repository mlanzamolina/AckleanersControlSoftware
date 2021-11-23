import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./NewPassword";
import logo from "../../img/logo.png"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth  } from "../../components/firebase";
import { getAuth, updatePassword } from "firebase/auth";

export default function NewPassword() {
  const [pass2, setPass2] = useState("");
  const [pass, setPass] = useState("");
  const [user1, loading, error] = useAuthState(auth);

  /*useEffect(() => {
    if (user1) history.replace("/dashboard");
  }, [user1, loading]);*/
 

  function handleSubmit() {
      


    
      
        if(pass === pass2){
            
            const auth = getAuth();

            const user = auth.currentUser;
           // const newPassword = getASecureRandomPassword();

            updatePassword(user, pass).then(() => {
              // Update successful.
              alert("Se cambio exitosamente la contraseña");
            }).catch((error) => {
           // An error ocurred
           // ...
            });
        }else{
            alert("Contraseña incorrecta");
        }
      
    
   }

   
    return (
      
      <div className="wrapper">
      <div className="form-wrapper">
      <h1>Cambiar Contraseña</h1>
      <form >
            <div className="login-form">
            <div className="password">
                <label htmlFor="password">Contraseña</label>
                <input
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  noValidate
                  onChange={(e) => { setPass2(e.target.value); }}
                />
              </div>
             

              <div className="password">
                <label htmlFor="password">Confirmar Contraseña</label>
                <input
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  noValidate
                  onChange={(e) => { setPass(e.target.value); }}
                />
              </div>
              <div>
            
              </div>
              <div className="createAccount">
                <button onClick={handleSubmit}>cambiar contraseña</button>
              </div>
              <div>
                <div>
              
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