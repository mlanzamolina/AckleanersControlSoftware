//generar id de ventana de confirmacion de la informacion enviada al product owner
import React, { useState, useEffect } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../img/logo.png";
import Nav from "../NavAdmin";

function ConfirmReport() {
    const {id}=useParams();
  return (
    <>
      <Nav />

      <div class="contentf">
        <h3>
          Soy confirmacion de reportes id:{id}
        </h3>
      </div>
    </>
  );
}

export default ConfirmReport;
