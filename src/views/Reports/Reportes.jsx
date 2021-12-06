import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory, useParams } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../img/logo.png";
import swal from "sweetalert";
import "./table.css";
import ReportsNavigation from "./ReportsNavigation";

export default function Reportes() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();
  const [dats, setDatos] = useState({
    numero: 0,
  });

  const handleInputChance = (event) => {
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
  };
  function handleSubmit() {
    history.push(`/AgregarReportes/${dats.numero}`);
  }

  return (
    <>
      <ReportsNavigation></ReportsNavigation>
      <h1 style={{ textAlign: "center" }}>Crear Reporte</h1>
      <form className="col-md">
        <div>
          <h3>Cantidad de unidades: </h3>
          <input
            placeholder="Ingrese la cantidad de unidades"
            className="form-control"
            type="number"
            name="numero"
            pattern="[0-9]{1}"
            title="numero de 0-9"
            onChange={handleInputChance}
            required
          ></input>
        </div>
        <div className="alinkcrear">
          <a href={`/AgregarReportes/${dats.numero}`} target="_blank"  style={{
           position: "fixed",
           width: "80px",
           height: "200px",
           margin: "5% auto", /* Will not center vertically and won't work in IE6/7. */
           left: 0,
           right: 0,
          }}>
            Crear
          </a>
        </div>
      </form>

      <a href="/">
        <img
          src={logo}
          alt="logo ackleaners"
          width="250"
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
