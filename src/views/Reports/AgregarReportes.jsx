import React from "react";
import { useParams } from "react-router-dom";
import SingleImageUploadComponent from "./SingleImageUploadComponent ";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {logito} from "../../img/ack.png";


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
    <div id="logit">
    <img src={logito} alt="" width= "100%"/>
    </div>
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
        <label for="Nombre">Nombre(Cliente):</label>
        <input type="text" class="form-control" id="inputNombre" placeholder="Nombre Completo"/>
        </div>
        <div class="form-group col-md-6">
        <label for="Correo electronico">Correo(Cliente): </label>
        <input type="text"class="form-control" id="inputCorreo" placeholder="Correo Electrónico"/>
        </div>
      </div>
        <div class="form-group col-md-6">
        <label for="Fecha">Fecha de Orden de Trabajo:</label>
        <input type="date" class="form-control" placeholder="Fecha"/>
        </div>
        <div class="form-group col-md-6">
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
      
    </div>
    </>
  );
}
