import React from "react";
import "./estiloReporte.css";
import { Link } from "react-router-dom";
import Nav from "../NavAdmin";
export const Reportes = () => {
  return (
    <>
      <Nav></Nav>
      <div
        className="contenedorPrincipal2"
        style={{ width: "100%", height: "100%" }}
      >
        <a
          className="navbar-brand"
          style={{ margin: "0px 10px" }}
          href="/Reportes"
        >
          Reportes
        </a>
        <div className="p-3 estiloPrincipal">
          <div className="container rounded estiloContenedor">
            <div>
              <form className="row g-3">
                <div class="offset-lg-1 espaciadoContenedor">
                  <Link to="/CrearReportes">
                    <button className="rounded botonSize fondoAgregar">
                      Crear Reporte
                    </button>
                  </Link>
                </div>

                {/*<div class="offset-lg-2 espaciadoContenedor">
                  <Link to="/DescargarReporte">
                    <button className="rounded botonSize fondoDescargar">
                      Bajar Reporte
                    </button>
                  </Link>
                </div>

                <div class="offset-lg-1 espaciadoContenedor">
                  <button className="rounded botonSize fondoEliminar">
                    Eliminar Reporte
                  </button>
                </div>
                <div class="offset-lg-2 espaciadoContenedor">
                  <Link to="/admiReportes">
                    <button className="rounded botonSize fondoActualizar">
                      Actualizar Reporte
                    </button>
                  </Link>
                </div>*/}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
