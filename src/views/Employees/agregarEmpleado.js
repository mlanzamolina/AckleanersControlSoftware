import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { dbEmpleado, almacenamiento, auth } from "../../components/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import swal from "sweetalert";
import "./estiloEmpleado.css";
import Nav from "../NavAdmin";

const AgregarEmpleado = () => {
  const [user, loading, error] = useAuthState(auth);
  const tablaEmpleadosRef = collection(dbEmpleado, "Empleados");
  const [empleados, emp_loading, emp_error] = useCollectionData(
    collection(dbEmpleado, "Empleados"),
    { idField: "id" }
  );
  const [image, setImage] = useState("");
  const [imageurl, setimageURL] = useState("");
  const [dni_unico, setDni_unico] = useState("");

  useEffect(() => {
    if (loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  const [dats, setDatos] = useState({
    nombre: " ",
    dni: " ",
    numero: " ",
    correo: " ",
    direccion: " ",
    estado: "ACTIVO",
    foto: "",
  });

  const handleInputChance = (event) => {
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
  };

  const handleDni = (e) => {
    setDni_unico(true);
    empleados.map((item) => {
      if (item.dni === e.target.value) {
        setDni_unico(false);
        swal({
          title: "Numero de Documento Nacional de Identifacicion repetido",
          text: "Por favor reingrese un DNI unico o no se le dejara avanzar a agregar",
          icon: "warning",
          button: "aceptar",
        });
      }
    });
  };

  const handleFileSubmit = (e) => {
    if (
      !(
        e.target.files[0].name.toLowerCase().endsWith(".png") ||
        e.target.files[0].name.toLowerCase().endsWith(".jpg")
      )
    ) {
      swal({
        title: "Formato de archivo no aceptable",
        text: "El archivo subido no es una foto, por favor asegurarse de subir una imagen formato png o jpeg",
        icon: "warning",
        button: "aceptar",
      });
      e.target.value = null;
      setimageURL(null);
      setImage(null);
      return;
    }
    setimageURL(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    if (
      dats.nombre == " " ||
      dats.numero == " " ||
      dats.id == " " ||
      dats.correo == " " ||
      image === null ||
      !dni_unico
    ) {
      swal({
        title: "No se realizo",
        text: "No se agregro el empleado, verifique los campos",
        icon: "warning",
        button: "aceptar",
      });
    } else {
      var n_empleado_id = null;
      document.getElementById("b_submit").disabled = true;
      document.getElementById("b_cancelar").disabled = true;
      await addDoc(tablaEmpleadosRef, {
        nombre: dats.nombre,
        dni: dats.dni,
        n_telefono: dats.numero,
        correo: dats.correo,
        estado: dats.estado,
        direccion: dats.direccion,
        foto: dats.foto,
      }).then((n_doc) => {
        console.log(n_doc.id);
        n_empleado_id = n_doc.id;
      });
      console.log(n_empleado_id);
      const uploadtask = almacenamiento
        .ref("/UsuarioFotos/" + n_empleado_id)
        .put(image);
      uploadtask
        .then((uploadtaskSnapshot) => {
          return uploadtaskSnapshot.ref.getDownloadURL();
        })
        .then((url) => {
          updateDoc(doc(dbEmpleado, "Empleados", n_empleado_id), {
            foto: url,
          });
          setImage(null);
          setimageURL(null);
          document.getElementById("i_nombre").value = null;
          document.getElementById("i_email").value = null;
          document.getElementById("i_dni").value = null;
          document.getElementById("i_telefono").value = null;
          document.getElementById("i_dirrecion").value = null;
          document.getElementById("b_file").value = null;
          document.getElementById("b_submit").disabled = false;
          document.getElementById("b_cancelar").disabled = false;
          swal({
            title: "Realizado",
            text: "Se agregro el empleado",
            icon: "info",
            button: "aceptar",
          });
        });
    }
  };

  return (
    <Fragment>
      <Nav />
      <div class="contentf">
        <div
          className="contenedorPrincipal"
          style={{ width: "100%", height: "100%" }}
        >
          <h1 style={{
            width:"100%",
            textAlign:"center", 
            marginTop:"1%", 
            marginBottom:"20px",
            borderBottom:"2px solid black"
          }}
            >Agregar Empleado</h1>
          <div className="container rounded contenedorFormulario">
            <div>
              <form className="row g-3">
                <div className="col-md-6">
                  <label
                    htmlFor="inputAddress"
                    className="form-label letrasFormulario"
                    style={{ marginTop: "5%" }}
                  >
                    Nombre Completo
                  </label>
                  <input
                    id="i_nombre"
                    type="text"
                    className="form-control"
                    placeholder="Eje. Carlos Flores"
                    name="nombre"
                    onChange={handleInputChance}
                    required
                  ></input>
                </div>
                <div className="col-md-4">
                  <label
                    for="inputAddress"
                    className="form-label letrasFormulario"
                    style={{ marginTop: "8%" }}
                  >
                    Correo Electronico
                  </label>
                  <input
                    id="i_email"
                    type="email"
                    className="form-control"
                    placeholder="Eje. test@mail.com"
                    onChange={handleInputChance}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    title="Formato: ejemplo.123@ejemplo.com"
                    name="correo"
                    autoFocus
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <label
                    for="inputAddress"
                    className="form-label letrasFormulario"
                  >
                    DNI
                  </label>
                  <input
                    id="i_dni"
                    type="text"
                    class="form-control"
                    placeholder="Eje. 1804198002033"
                    name="dni"
                    pattern="[0-9]{13}"
                    title="Numero 13 digitos sin guiones"
                    onChange={handleInputChance}
                    onBlur={handleDni}
                    autoFocus
                    required
                  ></input>
                </div>
                <div class="col-5">
                  <label for="inputAddress" class="form-label letrasFormulario">
                    N.Telefono
                  </label>
                  <input
                    id="i_telefono"
                    type="text"
                    class="form-control"
                    name="numero"
                    placeholder="Eje. 9940-1110"
                    pattern="[0-9]{8}"
                    title="Numero 8 digitos sin nada extra"
                    onChange={handleInputChance}
                    required
                  ></input>
                </div>
                <div class="col-md-10">
                  <label
                    for="exampleFormControlTextarea1"
                    class="letrasFormulario"
                  >
                    Direccion
                  </label>
                  <textarea
                    id="i_dirrecion"
                    class="form-control"
                    style={{ resize: "none" }}
                    name="direccion"
                    rows="3"
                    onChange={handleInputChance}
                    required
                    placeholder="Direccion donde reside el empleado"
                  ></textarea>
                </div>

                <div>
                  <img
                    id="foto"
                    src={imageurl}
                    className="col-3 offset-lg-4 foto rounded"
                  />
                </div>

                <div class="offset-lg-4">
                  <input
                    id="b_file"
                    type="file"
                    class="form-control-file"
                    accept=".jpg,.png"
                    onChange={handleFileSubmit}
                  />
                </div>

                <div class="col-12 offset-lg-7">
                  <button
                    id="b_submit"
                    type="submit"
                    class="btn btn-primary"
                    style={{ marginBottom: "3%", marginRight: "2%" }}
                    onClick={(e) => handleSubmit(e.preventDefault())}
                  >
                    Registrar Empleado
                  </button>

                  <Link to="/eliminarEmpleados">
                    <button
                      id="b_cancelar"
                      type="submit"
                      class="btn btn-secondary"
                      style={{ marginBottom: "3%", marginRight: "2%" }}
                    >
                      Ver Empleados
                    </button>
                    </Link>

                  <Link to="/interfazEmpleados">
                    <button
                      id="b_cancelar"
                      type="submit"
                      class="btn btn-danger"
                      style={{ marginBottom: "3%" }}
                    >
                      Volver
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AgregarEmpleado;