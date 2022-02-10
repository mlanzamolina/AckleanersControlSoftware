import React from "react";
import "./estiloEmpleado.css";
import { Link } from "react-router-dom";
import Nav from "../NavAdmin";
export const Empleados = () => {
  return (
    <>
      <Nav></Nav>
      <div
        className="contenedorPrincipal2"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="p-3 estiloPrincipal">
          <div className="container rounded estiloContenedor">
            <div>
              <form className="row g-3">
              <div class="offset-lg-2 espaciadoContenedor">
                  <Link to="/EliminarEmpleados">
                    <button className="rounded botonSize fondoListarEmpleado">
                      Listar Empleados
                    </button>
                  </Link>
                </div>
                <div class="offset-lg-1 espaciadoContenedor">
                  <Link to="/AgregarEmpleado">
                    <button className="rounded botonSize fondoAgregarEmpleado">
                      Agregar Empleado
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
