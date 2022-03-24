import React, { Fragment, useState, useEffect } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../../components/firebase";
import "../Documents/estiloDocs.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Nav from "../NavAdmin";

export const AgregarDocumento = () => {
  let hoy = new Date();
  let fechaActual =
    hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
  const [archivoUrl, setArchivoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  function habilitarID() {
    var seleccionado = document.getElementById("i_tipo").value;
    if (seleccionado == "Reporte") {
      document.getElementById("id_reporte").removeAttribute("disabled");
    } else {
      document.getElementById("id_reporte").setAttribute("disabled", true);
      document.getElementById("id_reporte").value = null;
    }
  }

  const archivoHandler = async (event) => {
    const archivo = event.target.files[0];
    swal({
      title: "¡Revisando el documento!",
      icon: "warning",
      text: "Un momento...",
      timer: 2000,
      button: false,
    });
    setIsLoading(true);
    const storageRef = app.storage().ref("Documentos");
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("Archivo cargado ", archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);
    setIsLoading(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const nombreArchivo = event.target.nombre.value;
    if (!nombreArchivo) {
      swal({
        title: "No se realizo",
        text: "Coloque un nombre para el archivo",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    const descripcionArchivo = event.target.descripcion.value;
    if (!descripcionArchivo) {
      swal({
        title: "No se realizo",
        text: "Coloque una descripcion para el archivo",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    const tipoArchivo = event.target.tipo.value;
    if (tipoArchivo == "Seleccione tipo de archivo") {
      swal({
        title: "No se realizo",
        text: "Coloque un tipo para el archivo",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    const fechaArchivo = fechaActual;
    const idDeReporte = event.target.idreporte.value;
    const tablaDocumentosRef = app.firestore().collection("Documentos");

    if (tipoArchivo == "Reporte") {
      if (!idDeReporte || idDeReporte == " ") {
        swal({
          title: "No se realizo",
          text: "Coloque un ID valido para archivo reporte",
          icon: "warning",
          button: "Aceptar",
        });
        return;
      } else {
        const documento = tablaDocumentosRef.doc().set({
          nombre: nombreArchivo,
          descripcion: descripcionArchivo,
          tipo: tipoArchivo,
          url: archivoUrl,
          fecha: fechaArchivo,
          idreporte: idDeReporte,
        });
      }
    } else {
      const documento = tablaDocumentosRef.doc().set({
        nombre: nombreArchivo,
        descripcion: descripcionArchivo,
        tipo: tipoArchivo,
        url: archivoUrl,
        fecha: fechaArchivo,
      });
    }

    swal({
      title: "¡Agregado!",
      text: "Archivo agregado a la base de datos",
      icon: "info",
      button: "Aceptar",
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    document.getElementById("i_nombre").value = null;
    document.getElementById("i_descripcion").value = null;
    document.getElementById("id_reporte").value = null;
    document.getElementById("i_foto").value = null;
    document.getElementById("i_tipo").value = "Seleccione tipo de archivo";
    return;
  };

  return (
    <>
      <Nav></Nav>
      <form onSubmit={submitHandler}>
        <div className="p-2 contenedorPrincipalDoc">
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "1%",
              marginBottom: "80px",
              borderBottom: "2px solid black",
              fontSize: "30px",
            }}
          >
            Agregar Documento
          </h1>
          <div
            style={{ width: "90%" }}
            className="container rounded contenedorFormulario"
          >
            <div style={{ marginBottom: "100%" }}>
              <div class="mb-3 col-md-12">
                <label
                  for="exampleFormControlInput1"
                  className="form-label letrasFormulario"
                  style={{
                    marginTop: "2%",
                    paddingLeft: "80%",
                    fontSize: "18px",
                  }}
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
                  class="form-control rounded"
                  id="i_nombre"
                  placeholder="Ingrese nombre"
                  name="nombre"
                ></input>
              </div>
              <div class="mb-3 col-md-6">
                <label
                  for="exampleFormControlInput1"
                  className="form-label letrasFormulario"
                >
                  ID de Reporte
                </label>
                <input
                  type="text"
                  class="form-control rounded"
                  id="id_reporte"
                  placeholder="Ingrese un ID valido"
                  name="idreporte"
                  disabled
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
                  onChange={habilitarID}
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
                  class="btn btn-success"
                  style={{
                    marginBottom: "5%",
                    marginRight: "2%",
                    marginTop: "5%",
                  }}
                >
                  {isLoading ? (
                    <h1 class="btn btn-sucess" type="button" disabled>
                      <span
                        style={{ background: "white" }}
                        class="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span style={{ color: "white" }} class="sr-only">
                        Cargando...
                      </span>
                    </h1>
                  ) : (
                    <h1>Cargar Documento</h1>
                  )}
                </button>

                <Link to="/adminDocs">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    style={{ marginBottom: "5%", marginTop: "5%" }}
                  >
                    Volver
                  </button>
                </Link>

                <Link to="/admiDocumentos">
                  <button
                    type="submit"
                    class="btn btn-secondary"
                    style={{
                      marginLeft: "2%",
                      marginBottom: "5%",
                      marginTop: "5%",
                    }}
                  >
                    Administrar Documentos
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default AgregarDocumento;
