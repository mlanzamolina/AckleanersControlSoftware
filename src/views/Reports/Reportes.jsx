import React, { useState, useEffect} from "react";
import {auth} from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory, useParams } from "react-router-dom";
import { SidebarData } from "./SideBarData";

import swal from "sweetalert";
import "./table.css";
import Nav from "../NavAdmin";

export default function Reportes() {
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();
  const [dats, setDatos] = useState({
    numero: 0,
    nombre: "",
    telefono: "",
  });
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

  const handleInputChance = (event) => {
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
    console.log(dats);
  };

  function handleSubmit() {
    if(dats.nombre === "" || dats.numero === "" || dats.telefono === ""){
   
      swal({
        title: "Revisar fomulario",
        text: "Por favor verifique que todos los campos esten llenos",
        icon: "warning",
        button: "aceptar",
      });
      
    }else{
      history.push(`/AgregarReportes/${dats.numero}/${dats.nombre}/${dats.telefono}`);

    }
   
  }

  useEffect(() => {
    if(loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  return (
    <>
      <Nav></Nav>
      <div class="sidebar">
        <a class="active" href="/Reportes">Reportes</a>
      </div>
      <div class="contentf">
      <h1 style={{ textAlign: "center" }}>Crear Reporte</h1>
      <div className="containerf">
    <form className="row g-3">
    <div class="col-md-6">
      <label for="inputNombre">Nombre del Cliente</label>
      <input  required type="text" name ="nombre" class="form-control" onChange={handleInputChance} id="inputNombre" placeholder="Nombre Cliente"/>
      </div>
      <div className="col-md-6">
      <label for="inputFecha">Fecha</label>
      <input type="text" class="form-control" id="inputFecha" disabled value={fecha}/>
      </div>
      <div className="col-md-6">
        <label for="inputTelefono">Telefono del Cliente</label>
        <input required type="text" name="telefono" class="form-control" onChange={handleInputChance} id="inputTelefono" placeholder="Telefono/celular"/> 
      </div>
  <div class="col-md-6">
    <label for="inputAddress">ID de Orden de Trabajo</label>
    <input required type="text" class="form-control" id="inputOrdenTrabajo" placeholder="ID del Reporte"/>
  </div>
  <div class="col-md-6">
    <label for="inputAddress2">Nombre del Empleado que genero el Reporte</label>
    <input  required type="text" class="form-control" id={"Empleado"} placeholder="Ejemplo: Rodrigo Bardales"/>
  </div>
  <div>
          <h6>Cantidad de unidades: </h6>
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
          <button className="btn btn-primary" onClick={handleSubmit}>
         
            Crear
        </button>
        </div>
      </form>
     
</div>
      {/* <a href="/">
        <img
          src={logo}
          alt="logo ackleaners"
          width="150"
          style={{
            margin: 0,
            top: "auto",
            right: 45,
            bottom: 40,
            position: "fixed",
          }}
        />
      </a> */}
      </div>
    </>
  );
}
