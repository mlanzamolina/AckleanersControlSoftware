import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../img/logo.png";
import Nav from "../NavAdmin";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, Firestore, updateDoc } from "firebase/firestore";
import { dbOrdenes, db } from "../../components/firebase";
import swal from "sweetalert";

function ConfirmReport() {
  const history= useHistory();
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
        {documentos
          ? documentos.map((item, index) => {
              if (item.idreporte === id) {
                //download a pdf of reports to review
                return (
                  <tr key={item.id} className="text-center">
                    <td className="table-primary">{item.nombre}/ </td>
                    <td className="table-primary">{id}/ </td>
                    <td className="table-primary">
                      <a href={item.url} target="_blank">
                        <button type="button" class="btn btn-primary">
                          {" "}
                          Download
                        </button>
                      </a>
                    </td>
                  </tr>
                );
              }
            })
          : null}

        
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
          style={{
            fontSize: "20px",
            paddingLeft: "110px",
            paddingRight: "110px",
          }}
        >
          Accept: enviar a cliente reporte finalizado
        </button>
        <a href="/CrearReportes">
          {" "}
          <button
            type="button"
            className="btn btn-danger"
            style={{
              fontSize: "20px",
              paddingLeft: "110px",
              paddingRight: "110px",
            }}
          >
            Deny: volver a hacer el reporte
          </button>
        </a>
      </div>
    </>
  );
}

export default ConfirmReport;
