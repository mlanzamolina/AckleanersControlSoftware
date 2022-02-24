import React, {  useEffect } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Nav from "../NavAdmin";
import "./estiloInventario.css";

export default function Inventarios() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  return (
    <>
      <Nav></Nav>
      <div
        className="contenedorPrincipal2Inv"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="p-3 estiloPrincipalInv">
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
            Inventario
          </h1>
          <div
            className="text-center"
            id="marh1"
            style={{ margin: "50px 0px" }}
          ></div>
          <div className="container rounded estiloContenedorInv">
            <div>
              <form className="row g-3" style={{ paddingLeft: "4%" }}>
                <div class="offset-lg-1 espaciadoContenedorInv">
                  <Link to="/agregarInventario">
                    <button className="rounded botonSize fondoAgregarInv">
                      Subir Inventario
                    </button>
                  </Link>
                </div>
                <div
                  class="offset-lg-2 espaciadoContenedor"
                  style={{ paddingLeft: "5%" }}
                >
                  <Link to="/admiInventario">
                    <button className="rounded botonSize fondoAdministrarInv">
                      Administrar Inventario
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
}
