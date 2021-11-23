import React, { useState, useEffect, Component, PropTypes } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../img/logo.png";
import SingleImageUploadComponent from "./SingleImageUploadComponent ";
import { jsPDF } from "jspdf";
import ReactDOMServer from "react-dom/server";
import html2canvas from "html2canvas";

export default function AgregarReportes() {
  let { id } = useParams();

  function handleMandarReporte() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }
  const items = [];
  for (let index = 0; index < id; index++) {
    items.push(
      <div className="ta1">
        <table>
          <h2>Unidad: {index + 1}</h2>
          <tr>
            <th>Sucio</th>
            <th>Limpio</th>
          </tr>
          <tr>
            <td>
              <SingleImageUploadComponent />
            </td>
            <td>
              <SingleImageUploadComponent />
            </td>
          </tr>
          <tr>
            <td>
              <SingleImageUploadComponent />
            </td>
            <td>
              <SingleImageUploadComponent />
            </td>
          </tr>
        </table>
      </div>
    );
  }

  return (
    <>
     <label for="Nombre">Nombre:</label>
  <input type="text" id="Nombre" name="Nombre"></input><br /><br />
  <label for="Correo electronico">Correo : </label>
  <input type="text" id="Correo electronico" name="Correo electronico"></input>
    
    {/**<button className="button1" onClick={handleMandarReporte} style={{
      margin: 0,
      top: "auto",
      right: 0,
      top: 0,
      left: "auto",
      position: "fixed",
    }}>Herramienta de Reporte</button>**/}
    <div id="divToPrint">
      {items}
      
    </div>
    </>
  );
}
