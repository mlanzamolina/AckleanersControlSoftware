import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../components/firebase";
import "./Registrar.css";

function Registrar() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) alert("Please enter name");
    console.log(tipo)
    registerWithEmailAndPassword(name, email, password, tipo);
  };

  useEffect(() => {
    setTipo("admin");
    if (loading) return;
    if (user) console.log(user.email);
  }, [user, loading]);

  return (
    <div className="register">

      <div className="register__container">

        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />

        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />

        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <select>
          <option
            value="admin"
            onClick={(e) => setTipo(e.target.value)}
          >
            Administrador
          </option>

          <option
            value="empleado"
            onClick={(e) => setTipo(e.target.value)}
          >
            Empleado
          </option>
        </select>

        <button className="register__btn" onClick={register}>
          Register
        </button>

      </div>

    </div>
  );
}

export default Registrar;
