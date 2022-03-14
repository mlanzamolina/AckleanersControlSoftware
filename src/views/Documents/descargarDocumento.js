import { Link } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import { db } from "../../components/firebase";
import Nav from "../NavAdmin";

export const DescargarDocumento = () => {
  const [datos, setDatos] = useState({
    nombre: "",
    descripcion: "",
    url: "",
  });

  const [documentos, loading, error] = useCollectionData(
    collection(db, "Documentos"),
    { idField: "id" }
  );

  return (
    <>
      <Nav />
      <div className="p-2 contenedorPrincipalDoc">
      <h1 style={{
            width:"100%",
            textAlign:"center", 
            marginTop:"1%", 
            marginBottom:"80px",
            borderBottom:"2px solid black",
            fontSize:"30px"
          }}
            >Descargar Documentos</h1>
        <div
          className="container rounded contenedorFormularioBajar"
          style={{ marginBottom: "100%" }}
        >
          <table class="table table-hover table-responsive">
            <thead>
              <tr>
                <th scope="col" className="letrasFormulario">
                  Nombre Archivo
                </th>
                <th scope="col" className="letrasFormulario">
                  Descripcion
                </th>
                <th scope="col" className="letrasFormulario">
                  Enlace
                </th>
              </tr>
            </thead>
            <tbody>
              {documentos
                ? documentos.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="letrasFormulario">{item.nombre}</td>
                        <td className="letrasFormulario">{item.descripcion}</td>
                        <td>
                          <a
                            href={item.url}
                            target="_blank"
                            className="letrasDescarga"
                          >
                            Descargar
                          </a>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <div class="col-12 offset-lg-10">
            <Link to="/adminDocs">
              <button
                type="submit"
                class="btn btn-danger"
                style={{ marginBottom: "5%", marginTop: "5%" }}
              >
                Volver
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescargarDocumento;
