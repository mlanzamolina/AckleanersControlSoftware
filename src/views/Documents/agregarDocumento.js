import React, { useState } from "react";
import { app } from "../../components/firebase";
import "../Employees/estiloEmpleado.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Nav from "../NavAdmin";

export const AgregarDocumento = () => {

  let hoy = new Date();
  let fechaActual = hoy.getFullYear() + '-' + (hoy.getMonth()+1)+'-'+hoy.getDate();
  const [archivoUrl, setArchivoUrl] = useState("");

  const archivoHandler = async (event) => {
    const archivo = event.target.files[0];
    swal({
      title: "¡Revisando el documento!",
      icon: "warning",
      text: "Un momento...",
      timer: 5000,
      button: false,
    });
    const storageRef = app.storage().ref("Documentos");
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("Archivo cargado ", archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const nombreArchivo = event.target.nombre.value;
    if (!nombreArchivo) {
      swal({
        title: "No se realizo",
        text: "Coloque un nombre para el archivo",
        icon: "warning",
        button: "aceptar",
      });
      return;
    }
    const descripcionArchivo = event.target.descripcion.value;
    if (!descripcionArchivo) {
      swal({
        title: "No se realizo",
        text: "Coloque una descripcion para el archivo",
        icon: "warning",
        button: "aceptar",
      });
      return;
    }

    const tipoArchivo = event.target.tipo.value;
    if (tipoArchivo === "Seleccione tipo de archivo") {
      swal({
        title: "No se realizo",
        text: "Coloque un tipo para el archivo",
        icon: "warning",
        button: "aceptar",
      });
      return;
    } 
    
    const fechaArchivo = fechaActual;

    const tablaDocumentosRef = app.firestore().collection("Documentos");
    const documento = tablaDocumentosRef.doc().set({
      nombre: nombreArchivo,
      descripcion: descripcionArchivo,
      tipo: tipoArchivo,
      url: archivoUrl,
      fecha: fechaArchivo,
    });
    swal({
      title: "¡Agregado!",
      text: "Archivo agregado a la base de datos",
      icon: "info",
      button: "Aceptar",
    });

    document.getElementById("i_nombre").value = null;
    document.getElementById("i_descripcion").value = null;
    document.getElementById("i_foto").value = null;
    document.getElementById("i_tipo").value = "Seleccione tipo de archivo";
    return;
  };
    
    
  return (
    <div className="hide">
      <Nav></Nav>
      <form onSubmit={submitHandler}>
        <div className="p-2 contenedorPrincipal">
          <div className="container rounded contenedorFormulario">
            <div style={{ marginTop: "12%", marginBottom: "100%" }}>
              <div class="mb-3 col-md-12">
                <label
                  for="exampleFormControlInput1"
                  className="form-label letrasFormulario"
                  style={{ marginTop: "2%", paddingLeft: "80%", fontSize:"18px" }}
                >
                  Fecha actual: {fechaActual}
                </label>
              </div>
              <div class="mb-3 col-md-6">
                <label
                  for="exampleFormControlInput1"
                  className="form-label letrasFormulario"
                >
                  Nombre del Archivo
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="i_nombre"
                  placeholder="Ingrese nombre"
                  name="nombre"
                ></input>
              </div>
              <div class="mb-3 col-md-8">
                <label
                  for="exampleFormControlTextarea1"
                  className="form-label letrasFormulario"
                >
                  Descripcion del Archivo
                </label>
                <textarea
                  placeholder="Ingrese descripcion del archivo..."
                  className="form-control"
                  id="i_descripcion"
                  style={{ resize: "none" }}
                  rows="3"
                  name="descripcion"
                ></textarea>
              </div>
              <div class="mb-3 col-md-8">
                <select
                  name="tipo"
                  id="i_tipo"
                  class="form-select letrasFormulario"
                  style={{ color: "black" }}
                  aria-label="Default select example"
                >
                  <option selected>Seleccione tipo de archivo</option>
                  <option value="Instructivo">Instructivo</option>
                  <option value="Manual">Manual</option>
                  <option value="Procedimiento">Procedimiento</option>
                  <option value="Formato">Formato</option>
                  <option value="Reporte">Reporte</option>
                </select>
              </div>

              <div class="offset-lg-4">
                <input
                  id="i_foto"
                  type="file"
                  placeholder="Cargar documento..."
                  style={{ marginTop: "5%" }}
                  onChange={archivoHandler}
                />
              </div>

              <div class="col-12 offset-lg-7">
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{
                    marginBottom: "5%",
                    marginRight: "2%",
                    marginTop: "5%",
                  }}
                >
                  Cargar documento
                </button>

                <Link to="/adminDocs">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    style={{ marginBottom: "5%", marginTop: "5%" }}
                  >
                    Regresar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AgregarDocumento;
