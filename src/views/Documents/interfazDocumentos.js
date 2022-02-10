import React from "react";
import "./estiloDocs.css";
import { Link } from "react-router-dom";
import Nav from "../NavAdmin";
export const Documentos = () => {
  return (
    <>
      <Nav></Nav>
      <div
        className="contenedorPrincipal2"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="p-3 estiloPrincipal">
        <h1 style={{
            width:"100%",
            textAlign:"center", 
            marginTop:"1%", 
            marginBottom:"140px",
            borderBottom:"2px solid black",
            fontSize:"30px"
          }}
            >Documentos</h1>
          <div className="container rounded estiloContenedor">
            <div>
              <form className="row g-3" style={{paddingLeft:"4%"}}>
              <div class="offset-lg-4 espaciadoContenedor" style={{paddingLeft:"3%"}}>
                  <Link to="/AgregarDocumento">
                    <button className="rounded botonSize fondoAgregar" >
                      Agregar Documento
                    </button>
                  </Link>
                </div>
                <div class="offset-lg-1 espaciadoContenedor" style={{paddingLeft:"3%"}}>
                  <Link to="/AdmiDocumentos">
                    <button className="rounded botonSize fondoAdministrar">
                      Administrar Documentos
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
