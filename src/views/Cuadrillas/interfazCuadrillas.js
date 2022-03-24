import React, { useEffect } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./estiloCuadrillas.css";
import { Link } from "react-router-dom";
import Nav from "../NavAdmin";
export const InterfazCuadrillas = () => {
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
            Cuadrillas
          </h1>
          <div className="container rounded estiloContenedor">
            <div>
              <form className="row g-3" style={{ paddingLeft: "4%" }}>
                <div
                  class="offset-lg-4 espaciadoContenedor"
                  style={{ paddingLeft: "3%" }}
                >
                  <Link to="/agregarCuadrilla">
                    <button className="rounded botonSize fondoAgregarCuadrilla">
                      Agregar Cuadrilla
                    </button>
                  </Link>
                </div>
                <div
                  class="offset-lg-1 espaciadoContenedor"
                  style={{ paddingLeft: "3%" }}
                >
                  <Link to="/modificarCuadrilla">
                    <button className="rounded botonSize fondoModificarCuadrilla">
                      Administrar Cuadrillas
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
