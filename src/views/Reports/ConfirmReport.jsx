import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import Nav from "../NavAdmin";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, Firestore, updateDoc } from "firebase/firestore";
import { dbOrdenes, db } from "../../components/firebase";
import { app } from "../../components/firebase";
import swal from "sweetalert";

function ConfirmReport() {
  const history = useHistory();
  const [data, setData] = useState([]);
  let { id } = useParams();
  const [ordenes] = useCollectionData(collection(db, "OrdenesTrabajo"), {
    idField: "id",
  });
  const [documentos] = useCollectionData(collection(db, "Documentos"), {
    idField: "id",
  });
  function handleSubmit() {
    setTrueReporte();
  }

  const setTrueReporte = async () => {
    const dbOrdenes = doc(db, "OrdenesTrabajo", id);
    await updateDoc(dbOrdenes, { reporte: true })
      .then(() => {
        swal({
          title: "Completada",
          text: "Reporte fue confirmado",
          icon: "info",
          button: "Aceptar",
        });
      })
      .catch((e) => {
        alert(e);
      });
    history.push("/Management");
  };

  function habilitar(){
    var chkBox = document.getElementById('i_habilitar');

    if(chkBox.checked == true){
      document.getElementById('i_nombre').removeAttribute('disabled')
      document.getElementById('id_reporte').removeAttribute('disabled')
      document.getElementById('i_descripcion').removeAttribute('disabled')
      document.getElementById('i_foto').removeAttribute('disabled')
      document.getElementById('i_boton').removeAttribute('disabled')
    }else{
      document.getElementById('i_nombre').setAttribute('disabled',true)
      document.getElementById('id_reporte').setAttribute('disabled',true)
      document.getElementById('i_descripcion').setAttribute('disabled',true)
      document.getElementById('i_foto').setAttribute('disabled',true)
      document.getElementById('i_boton').setAttribute('disabled',true)
    }
  }

  let hoy = new Date();
  let fechaActual = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
  const [archivo, setArchivo] = useState("");
  const [archivoUrl, setArchivoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(true);

  const handleFileSubmit = (e) => {
    if (
      !(
        e.target.files[0].name.toLowerCase().endsWith(".pdf")
      )
    ) {
      swal({
        title: "Formato de archivo no aceptable",
        text: "El archivo subido no es un reporte en formato pdf, por favor asegurarse de subir el reporte en el formato adecuado.",
        icon: "warning",
        button: "Aceptar",
      });
      e.target.value = null;
      setArchivo(null);
      return;
    }
    setArchivo(e.target.files[0]);
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


    const fechaArchivo = fechaActual;
    const idDeReporte = event.target.idreporte.value;
    const tablaDocumentosRef = app.firestore().collection("Documentos");

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
    await archivoPath.put(archivo)
    .then((uploadtaskSnapshot) => {
      return uploadtaskSnapshot.ref.getDownloadURL();
    }).then((url) => {
      setIsLoading(false);
      setFlag(false);

      const documento = tablaDocumentosRef.doc().set({
        nombre: nombreArchivo,
        descripcion: descripcionArchivo,
        tipo: "Reporte",
        url: url,
        fecha: fechaArchivo,
        idreporte: idDeReporte,
      });

      swal({
        title: "¡Agregado!",
        text: "Archivo agregado a la base de datos",
        icon: "info",
        button: "Aceptar",
      });
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    document.getElementById("i_nombre").value = null;
    document.getElementById("i_descripcion").value = null;
    document.getElementById("id_reporte").value = null;
    document.getElementById("i_foto").value = null;
    return;
  };

  return (
    <>
      <Nav />
      <div className="contentf">
        <h1 style={{
          width: "100%",
          textAlign: "center",
          marginTop: "1%",
          marginBottom: "80px",
          borderBottom: "2px solid black",
          fontSize: "30px"
        }}
        >Confirmar Reporte de Orden de Trabajo</h1>
        <div className="container rounded estiloContenedorReporte" style={{ width: "90%", height: "70%" }}>
          <div class="row">
            <div style={{ marginTop: "2%", color: "white" }} class="col-lg-8 col-md-12 mb-4">

              <div
                style={{ background: "transparent", borderColor: "rgb(176,176,176)" }}
                class="card">
                <div class="card-body">
                  <h5 class="card-title">Hola Equipo de Ackleaners,
                    <br />
                    <br />
                    Se ha registrado un nuevo reporte para una orden de trabajo
                    por favor, verificar que los datos esten correctos.
                    <br />
                    <br />
                  </h5>
                  {documentos
                    ? documentos.map((item, index) => {
                      if (item.idreporte === id) {
                        //download a pdf of reports to review
                        return (
                          <Fragment>
                            <label key={item.id} className="">Título Reporte: {item.nombre} </label>
                            <br />
                            <label key={item.id} style={{ marginTop: "20px" }} className="">
                              ID de Reporte: {id} </label>
                            <br />
                            <label key={item.id} style={{ marginTop: "20px" }} className="">
                              Fecha de Reporte: {item.fecha} </label>
                            <br />
                            <label key={item.id} style={{ marginTop: "20px" }} className="">
                              Descripción del Reporte: {item.descripcion} </label>
                            <br />
                            <label key={item.id} className="" style={{ marginTop: "20px" }}>Ver Reporte:
                              <a href={item.url} target="_blank">
                                <button type="button"
                                  className="btn btn-primary"
                                  style={{ marginLeft: "2%" }}>
                                  Descargar
                                </button>
                              </a>
                            </label>
                          </Fragment>
                        );
                      }
                    })
                    : null}
                </div>

              </div>
              <button
                type="button"
                className="btn btn-success"
                disabled={flag}
                onClick={handleSubmit}
                style={{
                  fontSize: "20px",
                  paddingLeft: "2%",
                  paddingRight: "2%",
                  marginTop: "6%"
                }}
              >
                Completar, Enviar Reporte a Cliente
              </button>
              <a href="/CrearReportes">
                {" "}
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{
                    fontSize: "20px",
                    paddingLeft: "2%",
                    paddingRight: "2%",
                    marginLeft: "2%",
                    marginTop: "6%"
                  }}
                >
                  Denegar, Rehacer el Reporte
                </button>
              </a>
            </div>


            <div style={{ marginTop: "2%" }} class="col-lg-4 col-md-6 mb-4">
              <form onSubmit={submitHandler}>
                <div class="card">
                  <div class="card-header">
                    Cargar Reporte
                    <input id="i_habilitar"
                    style={{marginLeft:"4%"}} 
                    type="checkbox"
                    onClick={habilitar}
                    >
                    </input>
                  </div>
                  <div class="card-body">
                    <label>Nombre del Archivo</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Ingrese nombre del archivo"
                      className="form-control rounded"
                      id="i_nombre"
                      name="nombre"
                      disabled
                    >
                    </input>

                    <br />
                    <label>ID del Reporte</label>
                    <input
                      type="text"
                      placeholder="Ingrese ID para el reporte"
                      className="form-control rounded"
                      id="id_reporte"
                      name="idreporte"
                      value={id}
                      readOnly
                      disabled
                    ></input>
                    <br />
                    <label>Descripción de Reporte</label>
                    <textarea
                      placeholder="Ingrese descripción del reporte..."
                      className="form-control rounded"
                      id="i_descripcion"
                      style={{ resize: "none" }}
                      name="descripcion"
                      disabled
                    ></textarea>

                    <br />
                    <label>Archivo</label>
                    <br />
                    <input
                      type="file"
                      placeholder="Cargar documento..."
                      id="i_foto"
                      onChange={handleFileSubmit}
                      disabled
                    />
                    <br />
                    <br />
                    <button
                      type="submit"
                      id="i_boton"
                      class="btn btn-success"
                      disabled
                      style={{
                        marginRight: "2%",
                        marginTop: "5%",
                      }}
                    >
                      {isLoading ?
                        <label class="btn btn-sucess" type="button" disabled>
                          <span style={{ background: "white" }} class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                          <span style={{ color: "white" }} class="sr-only">Cargando...</span>
                        </label> : <label>Cargar Documento</label>
                      }
                    </button>
                  </div>
                </div>
              </form>
            </div>


          </div>

        </div>
      </div>

    </>
  );
}

export default ConfirmReport;
