import React, { useState, useEffect } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import "./Management.css";
import logo from "../../img/logo.png";
import Nav from "../NavAdmin";

function SideMenu() {
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    console.log(user);
    if (loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  return (
    <>
      <Nav />

      <div class="contentf">
        <h3 name="bienvenido">
        Bienvenido ,Nombre de persona, al hub de herramientas administrativas
        hoy es , fecha de hoy, lista de clientes que tienen pendiente limpieza
        por fecha
        </h3>
      </div>
    </>
  );
}

export default SideMenu;
