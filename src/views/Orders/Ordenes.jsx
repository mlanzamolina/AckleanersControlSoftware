import React, { useState, useEffect} from "react";
import {auth} from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../img/logo.png";
import Nav from "../NavAdmin";

export default function Ordenes() {
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  
  useEffect(() => {
    if(loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  return (
    <>
      <Nav></Nav>
      <div class="sidebar">
        <a class="active" href="/Ordenes">
          Ordenes
        </a>
        <a href="/ListarOrdenes">Listar ordenes</a>
        <a href="/AgregarOrden">Agregar ordenes</a>
        <a href="/ModificarOrden">Modificar ordenes</a>
      </div>
      <div class="contentf">
        <h1 style={{ textAlign: "center" }}>Herramienta de ordenes</h1>
      </div>
    </>
  );
}
