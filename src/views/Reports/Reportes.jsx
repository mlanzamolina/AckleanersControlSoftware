import React, { useState, useEffect, Fragment } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, updateDoc } from "firebase/firestore";
import { dbOrdenes, db } from "../../components/firebase";
import swal from "sweetalert";
import "./table.css";
import "../Employees/estiloEmpleado.css"
import Nav from "../NavAdmin";
import * as emailjs from "emailjs-com";

export default function Reportes() {
  const tablaOrdenesRef = collection(dbOrdenes, "OrdenesTrabajo");
  const [empAdmin, setEmpAdmin] = useState("");
  const [orden_emps, setOrden_emps] = useState([]);
  const [flag, setFlag] = useState(true);
  const [cantUnidades, setcantUnidades] = useState(0);
  const [nomCliente, setNombreCliente] = useState("");
  const [id, setID] = useState("");
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
        text: "El empleado seleccionado ya esta agregado al reporte.",
        icon: "error",
        button: "Aceptar",
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
        button: "Aceptar",
      });
    }
  };
  const [user, loading, error] = useAuthState(auth);
  //const [sidebar, setSidebar] = useState(false);
  //const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();
  const [dats, setDatos] = useState({
    numero: 0,
    nombre: "",
    telefono: "",
  });
  const [fecha, setFecha] = useState("");
  const [fecha2, setFecha2] = useState("");

  useEffect(() => {
    if (loading) return;
    if (user === null) window.location.assign("/Login");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var mm2 = today.toLocaleString('es', { month: 'long' });
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = dd + " de " + mm2 + ", " + yyyy;
    setFecha(today);
    today = mm + "/" + dd + "/" + yyyy;
    setFecha2(today);
  }, [user, loading]);

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
      setID("");
    } else {
      nombreOrden.map((item) => {
        if (item.id === data) {
          setTelefono(item.numero_telefono);
          setNombreCliente(item.nombre);
          setcantUnidades(item.cantidad_unidades);
          setID(item.id);
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
        button: "Aceptar",
      });
    } else {
      setTrueReporte();


    }
  }

  const setTrueReporte = async () => {
    const dbOrdenes = doc(db, "OrdenesTrabajo", index);
    await updateDoc(dbOrdenes, { reporte: false })
      .then(() => {
        swal({
          title: "Completada",
          text: "Reporte creado, a continuación agregue imagenes.",
          icon: "info",
          button: "Aceptar",
        });
      })
      .then(() => {
        var template_params = {
          nombre: nomCliente,
          tel: telCliente,
          fecha1: fecha,
          fecha2: fecha2,
        };
        emailjs
          .send(
            "service_bv2gre1",
            "template_94rmrwe",
            template_params,
            emailjs.init("user_KnXE6C3gbj7LvCi9G8oET")
          )
        history.push(
          `/AgregarReportes/${cantUnidades}/${nomCliente}/${telCliente}/${id}`
        );
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Fragment>
      <Nav></Nav>
      <div class="contentf">

        {/*<div class="sidebar">
        <a class="active" href="/Reportes">
          Reportes
        </a>
      </div>*/}
        <div>
          <div className="text-center" style={{ margin: "50px 0px" }}>
            <h1 style={{
              width: "100%",
              textAlign: "center",
              marginTop: "1%",
              marginBottom: "25px",
              borderBottom: "2px solid black",
              fontSize: "30px"
            }}
            >Crear Reporte</h1>
          </div>
          <div className="containerf" style={{ background: "rgba(0, 0, 0, 0.40)", boxShadow: "none" }}>
            <form className="row g-3">
              <form class="row g-3">
                <h6 className="letrasFormularioOrdenes">Orden de Trabajo</h6>
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
                    <option selected value="primero">Seleccione Una Orden</option>
                    {nombreOrden
                      ? nombreOrden.map((item) => {
                        if (!item.reporte) {
                          return (
                            <option key={item.id} value={item.id}>
                              [Cliente: {item.nombre}]-[Unidades:{" "}
                              {item.cantidad_unidades}]-[Descripcion:{" "}
                              {item.descripcion}]
                            </option>
                          );
                        }

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
                <label for="inputNombre" className="letrasFormularioOrdenes">Nombre del Cliente</label>
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
                <label for="inputFecha" className="letrasFormularioOrdenes">Fecha</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputFecha"
                  disabled
                  value={fecha2}
                />
              </div>
              <div className="col-md-6">
                <label className="letrasFormularioOrdenes">Telefono del Cliente</label>
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
                <label className="letrasFormularioOrdenes">Cantidad de Unidades: </label>
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
                <h6 className="letrasFormularioOrdenes">Empleado Que Genero el Reporte</h6>
                <div class="col-auto">
                  <select
                    id="select"
                    class="form-select"
                    disabled={emp_loading}
                    onChange={(e) => {
                      setEmpAdmin(e.target.value);
                    }}
                  >
                    <option selected>Seleccione Un Empleado</option>
                    {empleados
                      ? empleados.map((item) => {
                        if(item.estado === "ACTIVO"){
                          return (
                            <option key={item.id} value={item.nombre}>
                              {item.nombre}
                            </option>
                          );
                        }
                      })
                      : null}
                  </select>
                </div>
              </form>
              <form class="row g-3">
                <h6 className="letrasFormularioOrdenes">Empleados Que Trabajaron En La Orden</h6>
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
                    <option selected>Seleccione Un Empleado</option>
                    {empleados
                      ? empleados.map((item) => {
                        if (item.estado === "ACTIVO") {
                          return (
                            <option key={item.id} value={item.nombre}>
                              {item.nombre}
                            </option>
                          );
                        }
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
                <button type="button" className="btn btn-success" onClick={handleSubmit} style={{ fontSize: "20px", paddingLeft: "110px", paddingRight: "110px" }}>
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
      </div>
    </Fragment>
  );
}
