import React from "react";
import { useParams } from "react-router-dom";
import SingleImageUploadComponent from "./SingleImageUploadComponent ";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import logito from "../../img/ack.png";
import { useState,useEffect } from "react";
import Reportes from "./Reportes";


export default function AgregarReportes() {
  
  let { id } = useParams();
  const nombre=useState();
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

  const [fecha,setFecha]= useState("");

  useEffect(()=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = mm + '/' + dd + '/' + yyyy;
setFecha(today);
  });

  const items = [];
  let index;
  for (index = 0; index < id; index++) {
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
    <form>
      <div>
    <img src={logito} alt="" width="250"/>
    </div>
      <div class="row g-3">
        <div class="col-md-3">
        <label for="Nombre">Nombre del Cliente:</label>
        <input type="text"class="form-control" id="inputNombre" placeholder="Nombre del cliente"/>
        </div>
        <div class="form-group col-md-3">
        <label for="Direccion">Direccion del Cliente: </label>
        <input type="text"class="form-control" id="inputDireccion" placeholder="ejemplo: Col. Villareal"/>
        </div>
      </div>
        <div class="form-group col-md-3">
        <label for="Fecha">Fecha de Orden de Trabajo:</label>
        <input type="text" class="form-control" id="inputFecha" disabled value={fecha}/>
        </div>
        <div class="form-group col-md-3">
        <label for="Numero Unidades">Numero de Unidades:</label>
        <h1>{index}</h1>
        </div>
    </form> 
  
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
      <div>
      <label>CONCLUSION: </label>
      </div>
      <textarea name="texto" cols="80" rows="10" placeholder="Escribe aquí el texto...">
    Este es el valor por defecto
  </textarea>
      <div>
      <label>Tel: 33067477  Correo Electronico : ackleaners@gmail.com</label>
      </div>
    </div>
    </>
  );
}
