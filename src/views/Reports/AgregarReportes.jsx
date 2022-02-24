import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import SingleImageUploadComponent from "./SingleImageUploadComponent ";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import logito from "../../img/ack.png";
import { useState,useEffect } from "react";
import Reportes from "./Reportes";
import "../Employees/estiloEmpleado.css";
//import ReactToPrint, {PrintContextConsumer} from "react-to-print";

export default function AgregarReportes() {
  
  let { id } = useParams();
  let {nombre}=useParams();
  let {telefono}=useParams();
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
          <br />
          <h1>Unidad: {index + 1}</h1>
          <tr>
            <th>Sucio</th>
            <th>Limpio</th>
          </tr>
          <h2>Velocidades</h2>
          <tr>
            <td>
              <SingleImageUploadComponent />
              <div class="form-group mx-sm-3 mb-2">
              <label for="inputvelocidad" class="sr-only">Velocidad Antes</label>
              <input type="text" class="form-control" id="inputvelocidad" placeholder="velocidad"/>
              </div>
              </td>
            <td>
              <SingleImageUploadComponent />
              <div class="form-group mx-sm-3 mb-2">
              <label for="inputvelocidad" class="sr-only">Velocidad Despues</label>
              <input type="text" class="form-control" id="inputvelocidad" placeholder="velocidad"/>
              </div>
            </td>
          </tr>
          <h2>Temperaturas</h2>
          <tr>
            <td>
              <SingleImageUploadComponent />
              <div class="form-group mx-sm-3 mb-2">
              <label for="inputtemperatura" class="sr-only">Temperatura Antes</label>
              <input type="text" class="form-control" id="inputtemperatura" placeholder="temperatura"/>
              </div>
            </td>
            <td>
              <SingleImageUploadComponent />
              <div class="form-group mx-sm-3 mb-2">
              <label for="inputtemperatura" class="sr-only">Temperatura Despues</label>
              <input type="text" class="form-control" id="inputtemperatura" placeholder="temperatura"/>
              </div>
            </td>
          </tr>
          <h2>Evaporador</h2>
          <tr>
           
            <td>
              <SingleImageUploadComponent />
            
            </td>
            <td>
              <SingleImageUploadComponent />
             
            </td>
          </tr>
          <h2>Condensador</h2>
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
        <a href="/management"><img src={logito} alt="" width="250"/></a>
    
    </div>
      <div class="row g-3">
        <div class="col-md-3">
        <label for="Nombre">Nombre del Cliente:</label>
        <input type="text" value={nombre} class="form-control" id="inputNombre" placeholder="Nombre del cliente"/>
        </div>
        <div className="col-md-3">
          <label for="Telefono">Telefono: </label>
          <input type="text" value={telefono} class="form-control" id="inputNombre" placeholder="Telefono/celular"/>
        </div>
      </div>
        <div class="form-group col-md-3">
        <label for="Fecha">Fecha de Orden de Trabajo:</label>
        <input type="text" class="form-control" id="inputFecha" disabled value={fecha}/>
        </div>
        <br></br>
        <label>Tipo de Vivienda</label>
        <div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
  <label class="form-check-label" for="exampleRadios1">
    Casa
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
  <label class="form-check-label" for="exampleRadios2">
    Negocio
  </label>
</div>
<br></br>
        <div class="form-group col-md-3">
        <label style={{margin: "10px 10px"}} for="Numero Unidades">Numero de Unidades: {index}</label>
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
  </textarea>

      <div>
      <label>Tel: 33067477  Correo Electronico : ackleaners@gmail.com</label>
      </div>

    </div>
    <button type="button" class="btn btn-success">Enviar reporte</button>
    <button type="button" class="btn btn-danger">Regresar</button>
    </>
  );
}
