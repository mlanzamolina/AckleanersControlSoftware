import React from "react";
import "./estiloOrdenes.css";
import { Link } from "react-router-dom";
import Nav from "../NavAdmin";
import swal from "sweetalert";

function enProceso(){
  swal({
    title: "Pagina en contruccion",
    text: "Estamos trabajando en ello",
    icon: "warning",
    button: "aceptar",
  });
}
export const IOrdenes = () => {
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
            marginBottom:"25px",
            borderBottom:"2px solid black",
            fontSize:"30px"
          }}
            >Ordenes de Trabajo</h1>
          <div className="container rounded estiloContenedor">
            <div>
              <form className="row g-3">
                <div class="offset-lg-4" style={{ paddingLeft: "10%" }}>
                  <Link to="/AgregarOrden">
                    <button className="rounded botonSize fondoAgregarOrden">
                      Agregar Orden de Trabajo
                    </button>
                  </Link>
                </div>

                <div
                  class="offset-lg-1 espaciadoContenedor"
                  style={{
                    paddingLeft: "5%",
                    paddingRight: "20%",
                    marginTop: "10%",
                  }}
                >
                  <Link to="/ListarOrdenes">
                    <button className="rounded botonSize fondoListarOrden">
                      Listar Ordenes de Trabajo
                    </button>
                  </Link>
                </div>

                <div
                  class="offset-lg-1 espaciadoContenedor"
                  style={{ paddingLeft: "3%", marginTop: "10%" }}
                >
                  <Link to="/adminOrders">
                    <button className="rounded botonSize fondoModificarOrden" onClick={enProceso}>
                      Modificar Ordenes de Trabajo
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
