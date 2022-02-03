import React, { useState, useEffect } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../img/logo.png";
import Nav from "../NavAdmin";
import "../Inventarios/estiloInventarios.css";

export default function Inventarios() {
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
        <a className="navbar-brand" style={{margin: "0px 10px"}} href="/inventarios">Inventarios</a>
        <div className="p-3 estiloPrincipalInv">
          <div className="container rounded estiloContenedorInv">
            <div>
              <form className="row g-3">
                <div class="offset-lg-1 espaciadoContenedorInv">
                  <Link to="/agregarInventarios">
                    <button className="rounded botonSize fondoAgregarInv">
                      Subir Inventario
                    </button>
                  </Link>
                </div>

                <div class="offset-lg-2 espaciadoContenedor">
                  <Link to="/DescargarDocumento">
                    <button className="rounded botonSize fondoDescargarInv">
                      Bajar Documento
                    </button>
                  </Link>
                </div>

                <div class="offset-lg-1 espaciadoContenedor">
                  <Link to="DeleteInventario">
                  <button className="rounded botonSize fondoEliminarInv">
                    Eliminar Documento
                  </button>
                  </Link>
                </div>
                <div class="offset-lg-2 espaciadoContenedor">
                  <Link to="/admiDocumentos">
                    <button className="rounded botonSize fondoActualizarInv">
                      Actualizar Documento
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
