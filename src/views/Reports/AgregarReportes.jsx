import React from "react";
import { useParams, Link } from "react-router-dom";
import SingleImageUploadComponent from "./SingleImageUploadComponent ";
import logito from "../../img/ack.png";
import { useState, useEffect } from "react";
import "../Employees/estiloEmpleado.css";
import swal from "sweetalert";

import * as emailjs from "emailjs-com";

export default function AgregarReportes() {
  let { id } = useParams();
  let { nombre } = useParams();
  let { telefono } = useParams();
  let { currentOrder } = useParams();
  const [urlReportes, setUrl] = useState("");
  const [fecha, setFecha] = useState("");

  async function sendMail() {
    var template_params = {
      to_name: "Revisador de Reportes",
      from_name: "Sistema de Reportes",
      tel: telefono,
      message: urlReportes,
    };
    console.log(template_params);

    emailjs
      .send(
        "service_07irwdr",
        "template_0n3zehl",
        template_params,
        emailjs.init("user_swdEcicIxbn0pfLvSx9HE")
      )
      .then(
        swal({
          title: "¡Enviado!",
          text: "Se envio un correo de confirmación",
          icon: "info",
          button: "Aceptar",
        })
      );
  }

  useEffect(() => {
    setUrl(
      "https://ackleaners-86539.web.app/confirmReport/" +
      String(currentOrder) +
      " || Dev url: local`http://localhost:3000/confirmReport/" +
      String(currentOrder)
    );
    console.log(urlReportes);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = mm + "/" + dd + "/" + yyyy;
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
                <label for="inputvelocidad" class="sr-only">
                  Velocidad Antes
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputvelocidad"
                  placeholder="velocidad"
                />
              </div>
            </td>
            <td>
              <SingleImageUploadComponent />
              <div class="form-group mx-sm-3 mb-2">
                <label for="inputvelocidad" class="sr-only">
                  Velocidad Despues
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputvelocidad"
                  placeholder="velocidad"
                />
              </div>
            </td>
          </tr>
          <h2>Temperaturas</h2>
          <tr>
            <td>
              <SingleImageUploadComponent />
              <div class="form-group mx-sm-3 mb-2">
                <label for="inputtemperatura" class="sr-only">
                  Temperatura Antes
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputtemperatura"
                  placeholder="temperatura"
                />
              </div>
            </td>
            <td>
              <SingleImageUploadComponent />
              <div class="form-group mx-sm-3 mb-2">
                <label for="inputtemperatura" class="sr-only">
                  Temperatura Despues
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputtemperatura"
                  placeholder="temperatura"
                />
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

  function print() {
    window.print();
  }

  return (
    <>
      <form>
        <div>
          <a href="/management">
            <img src={logito} alt="" width="250" />
          </a>
        </div>
        <div class="row g-3">
          <div class="col-md-3">
            <label for="Nombre">Nombre del Cliente:</label>
            <input
              type="text"
              value={nombre}
              class="form-control"
              id="inputNombre"
              placeholder="Nombre del cliente"
            />
          </div>
          <div className="col-md-3">
            <label for="Telefono">Telefono: </label>
            <input
              type="text"
              value={telefono}
              class="form-control"
              id="inputNombre"
              placeholder="Telefono/celular"
            />
          </div>
        </div>
        <div class="form-group col-md-3">
          <label for="Fecha">Fecha de Orden de Trabajo:</label>
          <input
            type="text"
            class="form-control"
            id="inputFecha"
            disabled
            value={fecha}
          />
        </div>

        <div class="form-group col-md-3">
          <label style={{ margin: "10px 10px" }} for="Numero Unidades">
            Numero de Unidades: {index}
          </label>
          <label style={{ margin: "10px 10px" }} for="Numero Unidades">
            Copiar ID de orden: {currentOrder}
          </label>
        </div>
      </form>
      <div id="divToPrint">
        {items}
        <div>
          <label>CONCLUSION: </label>
        </div>
        <textarea
          name="texto"
          cols="80"
          rows="10"
          placeholder="Escribe aquí el texto..."
        ></textarea>
        <div class="btn-group">
          <button style={{display:"", marginLeft:"20%", marginBottom:"10%"}} type="button" className="btn btn-primary rounded" onClick={print}>
            Descargar
          </button>
          <Link to={`/confirmReport/${currentOrder}`}>
            <button style={{ marginLeft:"10%", width:"200px"}} type="button" className="btn btn-success" onClick={sendMail}>
              Enviar reporte
            </button>
          </Link>
          <Link to="/CrearReportes">
            <button style={{display:"", marginLeft:"70%"}} type="button" className="btn btn-danger">
              Volver
            </button>
          </Link>
        </div>

        <div>
          <label>Tel: 33067477 Correo Electronico : ackleaners@gmail.com</label>
        </div>
      </div>

    </>
  );
}
