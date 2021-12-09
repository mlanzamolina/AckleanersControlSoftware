import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import "./Management.css";
import logo from "../../img/logo.png";
import Nav from "../NavAdmin"


function SideMenu() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);


  return (
    <>
   
    <Nav />
   
<div class="sidebar" >
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>

<div class="contentf">
<h3>Bienvenido ,Nombre de persoa, al hub de herramientas administrativas hoy es , fecha de hoy, lista de clientes que tienen pendiente limpieza por fecha</h3> 
</div>

      <a href="/">
        <img
          src={logo}
          alt="logo ackleaners"
      
          class="responsive"
          style={{
            
            margin: 0,
            top: "auto",
            right: 45,
            bottom: 40,
            position: "fixed",
          }}
        />
      </a>
     
     
    </>
  );
}

export default SideMenu;