import React, { useState } from "react";
import {
  db,
  auth,
  registerWithEmailAndPassword,
} from "../../components/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useForm } from "react-hook-form";
import "./estilo.css";
import logo from "../../img/logo.png";
import { FaWindows } from "react-icons/fa";

const AgregarUsuarios = () => {
  const userCollectionRef = collection(db, "Usuarios");

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [id, setID] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contra, setContra] = useState("");
  const [contra1, setContra1] = useState("");
  const [users, setUsers] = useState([]);

  /*const [form, setForm] = useState({
        nombreCompleto: '',
        id: '',
        correo: '',
        telefono: '',
        contra: '',
        confirmContra: ''


    });*/

  /*const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };*/

  /*function handleValidSubmit(event, values) {


        const campos = {
            nombreCompleto: values.nombre,
            telefono: values.telefono,
            id: values.id,
            correo: values.correo,
            contraseña: values.contra,
            confirmContra: values.contra1
        }

        if (this.state.contraseña === this.state.confirmContra) {

            db.collection('Users').doc().set(campos).then((resp) => {
                setForm({
                    nombreCompleto: '',
                    telefono: '',
                    id: '',
                    correo: '',
                    contraseña: ''

                })

                auth.createUserWithEmailAndPassword(nombreCompleto,correo);

                

                /*Swal.fire({
                    position: 'top-right',
                    icon: 'success',
                    title: 'SE CREO EL USUARIO EXITOSAMENTE!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch((error) => {
                Swal.fire({
                    position: 'top-right',
                    icon: 'error',
                    title: 'ERROR AL GUARDAR EL USUARIO EN BASE DE DATOS',
                    showConfirmButton: false,
                    timer: 1500
                })*/
  // })

  //alert("Se creo existosamente");

  //  }else{
  //  alert("Deben coincidir las contraseñas");
  //}

  //}

  const Validar = () => {
    console.log(contra);
    console.log(contra1);
    if (contra === contra1) {
      add();
    } else {
      alert("Las contraseñas deben coincidir");
    }
  };

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

    /*<div className="container">
            <form class="row g-3 needs-validation" onInvalid={handleValidSubmit}  > 

            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
                </div>
            </div>

            <div class="col-md-4">
                <label for="validationCustom01" class="form-label">First name</label>
                <input type="text" class="form-control" id="validationCustom01" onChange={handleChange} value={form.nombreCompleto} required> </input>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>


            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword"></input>
                </div>
            </div>

            <div class="col-12">
                <button class="btn btn-primary" type="submit" >Submit form</button>
            </div>

            </form>

        </div>*/
  );
};
export default AgregarUsuarios;
