import React, { useEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory, useParams } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../img/logo.png";
import swal from "sweetalert";
import "./table.css";

export default function Reportes() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();
  const [dats, setDatos] = useState({
    numero: 0,
    nombre: "",
    fecha: "",
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
  };

  function handleSubmit() {
    history.push(`/AgregarReportes/${dats.numero}`);
  }

  return (
    <>
      <div className="managementsidemenu">
        <Link to="#" className="managementmenu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav
        className={sidebar ? "managementnav-menu active" : "managementnav-menu"}
      >
        <ul className="managementnav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="managementmenu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={`management${item.cName}`}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <h1 style={{ textAlign: "center" }}>Crear Reporte</h1>
      <div className="containerf">
    <form className="row g-3">
    <div class="col-md-6">
      <label for="inputNombre">Nombre del Cliente</label>
      <input type="nombre" class="form-control" onChange={handleInputChance} id="inputNombre" placeholder="Nombre Cliente"/>
      </div>
      <div className="col-md-6">
      <label for="inputFecha">Fecha</label>
      <input type="text" class="form-control" id="inputFecha" disabled value={fecha}/>
  </div>
  <div class="col-md-6">
    <label for="inputAddress">ID de Orden de Trabajo</label>
    <input type="text" class="form-control" id="inputOrdenTrabajo" placeholder="ID del Reporte"/>
  </div>
  <div class="col-md-6">
    <label for="inputAddress2">Nombre del Empleado que genero el Reporte</label>
    <input type="text" class="form-control" id={"Empleado"} placeholder="Ejemplo: Rodrigo Bardales"/>
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
        <button className="btn btn-primary">
          <a href={`/AgregarReportes/${dats.numero}`} target="_blank" style={{color: "white"}}>
            Crear
          </a>
        </button>
      </form>
</div>
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
