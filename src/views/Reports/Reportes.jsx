import React, { useState, useEffect } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory, useParams } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { dbOrdenes, db } from "../../components/firebase";

import swal from "sweetalert";
import "./table.css";
import Nav from "../NavAdmin";

export default function Reportes() {
  const tablaOrdenesRef = collection(dbOrdenes, "OrdenesTrabajo");
  const [empAdmin, setEmpAdmin] = useState("");
  const [orden_emps, setOrden_emps] = useState([]);
  const [flag, setFlag] = useState(true);
  const [cantUnidades, setcantUnidades] = useState(0);
  const [nomCliente, setNombreCliente] = useState("");
  const [index, setIndex] = useState("");
  const [telCliente, setTelefono] = useState("");
  const [select_emp, setSelect_emp] = useState("");
  const [empleados, emp_loading, emp_error] = useCollectionData(
    collection(db, "Empleados"),
    { idField: "id" }
  );
  const [orden, setOrden] = useState([]);
  const [flag2, setFlag2] = useState(true);
  const [select, setSelect] = useState("");
  const [nombreOrden, nor_loading, nor_error] = useCollectionData(
    collection(db, "OrdenesTrabajo"),
    { idField: "id" }
  );

  const handleEmpleado = () => {
    if (!orden_emps.includes(select_emp)) {
      setOrden_emps([...orden_emps, select_emp]);
    } else {
      swal({
        title: "Error",
        text: "El empleado seleccionado ya esta agregado a al reporte.",
        icon: "error",
        button: "aceptar",
      });
    }
  };
  const handleOrden = () => {
    if (!orden.includes(select)) {
      setOrden([...orden, select]);
    } else {
      swal({
        title: "Error",
        text: "La orden seleccionada ya esta agregada al reporte.",
        icon: "error",
        button: "aceptar",
      });
    }
  };
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();
  const [dats, setDatos] = useState({
    numero: 0,
    nombre: "",
    telefono: "",
  });
  const [fecha, setFecha] = useState("");

  useEffect(() => {
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

  const handleInputChance = (event) => {
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
  };
  function handleOrdenData(data) {
    if (data === "primero") {
      setNombreCliente("");
      setcantUnidades(0);
      setTelefono("");
    } else {
      nombreOrden.map((item) => {
        if(item.id === data){ 
      setTelefono(item.numero_telefono);
      setNombreCliente(item.nombre);
      setcantUnidades(item.cantidad_unidades);
      }
         
        })
   
    }
  }

  function handleSubmit() {
    if (nomCliente === "" || telCliente === "" || cantUnidades === 0) {
      swal({
        title: "Revisar fomulario",
        text: "Por favor verifique que todos los campos esten llenos",
        icon: "warning",
        button: "aceptar",
      });
    } else {
      setTrueReporte();
   
    
    }
  }

  const setTrueReporte = async () => {
    const dbOrdenes = doc(db, "OrdenesTrabajo", index);
    await updateDoc(dbOrdenes, { reporte: true })
      .then(() => {
        swal({
          title: "Completada",
          text: "Reporte creado a continuacion agregue imagenes.",
          icon: "info",
          button: "Aceptar",
        });
      })
      .then(() => {
        history.push(
          `/AgregarReportes/${cantUnidades}/${nomCliente}/${telCliente}`
        );
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    if (loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  return (
    <>
      <Nav></Nav>
      <div class="sidebar">
        <a class="active" href="/Reportes">
          Reportes
        </a>
      </div>
      <div class="contentf">
        <h1 style={{ textAlign: "center" }}>Crear Reporte</h1>
        <div className="containerf">
          <form className="row g-3">
            <form class="row g-3">
              <h6>Orden de trabajo</h6>
              <div class="col-auto">
                <select
                  id="select"
                  class="form-select"
                  disabled={nor_loading}
                  onChange={(e) => {
                    setIndex(e.target.value);
                    handleOrdenData(e.target.value);
                  }}
                >
                  <option selected value="primero">Seleccioné una orden</option>
                  {nombreOrden
                    ? nombreOrden.map((item) => {
                      if(!item.reporte){ return (
                        <option key={item.id} value={item.id}>
                          [Cliente: {item.nombre}]-[Unidades:{" "}
                          {item.cantidad_unidades}]-[Descripcion:{" "}
                          {item.descripcion}]
                        </option>
                      );}
                       
                      })
                    : null}
                </select>
              </div>
              <div class="col-auto">
                <ul>
                  {orden.map((item, index) => (
                    <li key={index}>
                      {item}
                      <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        onClick={() => {
                          const temp = [...orden];
                          temp.splice(temp.indexOf(item), 1);
                          setOrden(temp);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </form>

            <div class="col-md-6">
              <label for="inputNombre">Nombre del Cliente</label>
              <input
                required
                type="text"
                name="nombre"
                class="form-control"
                onChange={handleInputChance}
                id="inputNombre"
                placeholder="Nombre Cliente"
                value={nomCliente}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label for="inputFecha">Fecha</label>
              <input
                type="text"
                class="form-control"
                id="inputFecha"
                disabled
                value={fecha}
              />
            </div>
            <div className="col-md-6">
              <label>Telefono del Cliente</label>
              <input
                type="text"
                class="form-control"
                onChange={handleInputChance}
                value={telCliente}
                placeholder="Telefono"
                disabled
              />
            </div>
            <div class="col-md-6">
              <label>Cantidad de unidades: </label>
              <input
                placeholder="Ingrese la cantidad de unidades"
                className="form-control"
                type="number"
                name="numero"
                pattern="[0-9]{1}"
                title="numero de 0-9"
                onChange={handleInputChance}
                value={cantUnidades}
                disabled
              ></input>
            </div>

            <form class="row g-3">
              <h6>Empleados que genero el reporte</h6>
              <div class="col-auto">
                <select
                  id="select"
                  class="form-select"
                  disabled={emp_loading}
                  onChange={(e) => {
                    setEmpAdmin(e.target.value);
                  }}
                >
                  <option selected>Seleccioné un empleado</option>
                  {empleados
                    ? empleados.map((item) => {
                        return (
                          <option key={item.id} value={item.nombre}>
                            {item.nombre}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </form>
            <form class="row g-3">
              <h6>Empleados que trabajaron en la orden</h6>
              <div class="col-auto">
                <select
                  id="select"
                  class="form-select"
                  disabled={emp_loading}
                  onChange={(e) => {
                    setFlag(e.target.selectedIndex === 0);
                    setSelect_emp(e.target.value);
                  }}
                >
                  <option selected>Seleccioné un empleado</option>
                  {empleados
                    ? empleados.map((item) => {
                        return (
                          <option key={item.id} value={item.nombre}>
                            {item.nombre}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              <div class="col-auto">
                <button
                  id="boton"
                  type="button"
                  class="btn btn-primary mb-3"
                  disabled={flag}
                  onClick={handleEmpleado}
                >
                  Agregar
                </button>
              </div>
              <div class="col-auto">
                <ul>
                  {orden_emps.map((element, index) => (
                    <li key={index}>
                      {element + "        "}

                      <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        onClick={() => {
                          const temp = [...orden_emps];
                          temp.splice(temp.indexOf(element), 1);
                          setOrden_emps(temp);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </form>

            <div className="alinkcrear">
              <button type="button"className="btn btn-primary" onClick={handleSubmit}>
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
