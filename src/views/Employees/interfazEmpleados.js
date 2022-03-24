import React, { useEffect } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./estiloEmpleado.css";
import { Link } from "react-router-dom";
import Nav from "../NavAdmin";
export const Empleados = () => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  return (
    <>
      <Nav></Nav>
      <div
        className="contenedorPrincipal2"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="p-3 estiloPrincipal">
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "1%",
              marginBottom: "140px",
              borderBottom: "2px solid black",
              fontSize: "30px",
            }}
          >
            Empleados
          </h1>
          <div className="container rounded estiloContenedor">
            <div>
              <form className="row g-3" style={{ paddingLeft: "4%" }}>
                <div
                  class="offset-lg-4 espaciadoContenedor"
                  style={{ paddingLeft: "3%" }}
                >
                  <Link to="/AgregarEmpleado">
                    <button className="rounded botonSize fondoAgregarEmpleado">
                      Agregar Empleados
                    </button>
                  </Link>
                </div>
                <div
                  class="offset-lg-1 espaciadoContenedor"
                  style={{ paddingLeft: "3%" }}
                >
                  <Link to="/EliminarEmpleados">
                    <button className="rounded botonSize fondoModificarEmpleado">
                      Administrar Empleados
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
