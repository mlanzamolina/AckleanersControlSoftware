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
import swal from "sweetalert";

export default function Inventarios() {
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  function error404(){
    swal({
      title: "Pagina en contruccion",
      text: "Estamos trabajando en ello",
      icon: "warning",
      button: "aceptar",
    });
  }

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
        <h1 style={{
            width:"100%",
            textAlign:"center", 
            marginTop:"1%", 
            marginBottom:"140px",
            borderBottom:"2px solid black",
            fontSize:"30px"
          }}
            >Inventario</h1>
        <div className="text-center" id="marh1" style={{ margin: "50px 0px" }}>
        </div>
          <div className="container rounded estiloContenedorInv">
            <div>
              <form className="row g-3" style={{paddingLeft:"4%"}}>
                <div class="offset-lg-1 espaciadoContenedorInv">
                  <Link to="/inventarios">
                    <button className="rounded botonSize fondoAgregarInv"  onClick={error404}>
                      Subir Inventario
                    </button>
                  </Link>
                </div>
                <div class="offset-lg-2 espaciadoContenedor" style={{paddingLeft:"5%"}}>
                  <Link to="/inventarios">
                    <button className="rounded botonSize fondoAdministrarInv" onClick={error404} >
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
