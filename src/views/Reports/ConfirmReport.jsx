import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import Nav from "../NavAdmin";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, Firestore, updateDoc } from "firebase/firestore";
import { dbOrdenes, db } from "../../components/firebase";
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
        <div className="container rounded contenedorFormulario" style={{ height: "70%" }}>
          <label className="letrasFormularioReportes" style={{ marginTop: "30px" }} classname="letrasFormulario">
            Hola Equipo de Ackleaners,
            <br />
            <br /> Se ha registrado un nuevo reporte para una orden de trabajo
            por favor, verificar que los datos esten correctos.
            <br></br>
            <br />
          </label>
          <br />
          {documentos
            ? documentos.map((item, index) => {
              if (item.idreporte === id) {
                //download a pdf of reports to review
                return (
                  <Fragment>
                    <label key={item.id} className="letrasFormularioReportes">Título Reporte: {item.nombre} </label>
                    <br />
                    <label key={item.id} style={{ marginTop: "20px" }} className="letrasFormularioReportes">
                      ID de Reporte: {id} </label>
                    <br />
                    <label key={item.id} style={{ marginTop: "20px" }} className="letrasFormularioReportes">
                      Fecha de Reporte: {item.fecha} </label>
                    <br />
                    <label key={item.id} style={{ marginTop: "20px" }} className="letrasFormularioReportes">
                      Descripción del Reporte: {item.descripcion} </label>

                    <br />
                    <label key={item.id} className="letrasFormularioReportes" style={{ marginTop: "20px" }}>Ver Reporte:
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
          <div class="col-12 offset-lg-1">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
              style={{
                fontSize: "20px",
                paddingLeft: "8%",
                paddingRight: "8%",
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
                  paddingLeft: "8%",
                  paddingRight: "8%",
                  marginLeft: "2%",
                  marginTop: "6%"
                }}
              >
                Denegar, Rehacer el Reporte
              </button>
            </a>
          </div>
        </div>
      </div>

    </>
  );
}

export default ConfirmReport;
