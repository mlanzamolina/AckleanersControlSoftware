import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dbOrdenes, db } from "../../components/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "firebase/firestore";
import "./Formulario.css";
import swal from "sweetalert";
import Nav from "../NavAdmin";
import "./estiloOrdenes.css";

const AgregarOrden = () => {
  const tablaOrdenesRef = collection(dbOrdenes, "OrdenesTrabajo");
  const [orden_emps, setOrden_emps] = useState([]);
  const [flag, setFlag] = useState(true);
  const [select_emp, setSelect_emp] = useState("");
  const [empleados, emp_loading, emp_error] = useCollectionData(
    collection(db, "Empleados"),
    { idField: "id" }
  );

  useEffect(() => {}, []);

  const [dats, setDatos] = useState({
    nombre: " ",
    numero_telefono: " ",
    cantidad_unidades: " ",
    descripcion: " ",
    tipo_vivienda: " ",
  });

  const handleInputChance = (event) => {
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
  };

  const handleEmpleado = () => {
    if (!orden_emps.includes(select_emp)) {
      setOrden_emps([...orden_emps, select_emp]);
    } else {
      swal({
        title: "Error",
        text: "El empleado seleccionado ya esta agregado a la orden.",
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  const handleSubmit = async (e) => {
    //console.log(JSON.stringify(dats))
    if (!dats.nombre || dats.nombre == " ") {
      swal({
        title: "No se realizo",
        text: "Por favor, ingrese nombre de cliente",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }else if(!dats.numero_telefono || dats.numero_telefono == " "){
      swal({
        title: "No se realizo",
        text: "Por favor, ingrese un numero de telefono",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }else if(!dats.cantidad_unidades || dats.cantidad_unidades == " " || dats.cantidad_unidades <= 0){
      swal({
        title: "No se realizo",
        text: "Por favor, ingrese una cantidad de unidades validas",
        icon: "warning",
        button: "Aceptar",
      });
      return; 
    }else if(!dats.descripcion || dats.descripcion == " "){
      swal({
        title: "No se realizo",
        text: "Por favor, ingrese una descripción para más detalles",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }else if(!dats.tipo_vivienda || dats.tipo_vivienda == " "){
      swal({
        title: "No se realizo",
        text: "Por favor, ingrese un tipo de servicio",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }else if(orden_emps.length === 0){
      swal({
        title: "No se realizo",
        text: "Por favor, ingrese al menos un empleado",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }else {
      var fecha = new Date();
      var hoy = new Date();
      if (dats.tipo_vivienda === "Casa") {
        fecha.setDate(fecha.getDate() + 90);
      } else {
        fecha.setDate(fecha.getDate() + 120);
      }
      var dd = fecha.getDate();
      var mm = fecha.getMonth() + 1; //January is 0!
      var yyyy = fecha.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      fecha = dd + "/" + mm + "/" + yyyy;
      dd = hoy.getDate();
      mm = hoy.getMonth() + 1; //January is 0!
      yyyy = hoy.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      hoy = dd + "/" + mm + "/" + yyyy;
      await addDoc(tablaOrdenesRef, {
        nombre: dats.nombre,
        numero_telefono: dats.numero_telefono,
        cantidad_unidades: dats.cantidad_unidades,
        descripcion: dats.descripcion,
        estado: "Pendiente",
        tipo_vivienda: dats.tipo_vivienda,
        empleados: orden_emps,
        reporte: false,
        proxima_revision: fecha,
        recordad: false,
        fecha: hoy,
        Randomid: "",
      });
      setOrden_emps([]);
      swal({
        title: "Realizado",
        text: "Se agrego una orden de trabajo",
        icon: "info",
        button: "Aceptar",
      });
      document.getElementById("a_nombre").value = null;
      document.getElementById("a_contacto").value = null;
      document.getElementById("a_cantidad").value = null;
      document.getElementById("a_descripcion").value = null;
      document.getElementById("a_tipo").value = null;
      document.getElementById("select").value = "Seleccione un Empleado";
    }
  };

  return (
    <>
      <Nav />

      <div className="contentf">
        <Fragment>
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "1%",
              marginBottom: "80px",
              borderBottom: "2px solid black",
            }}
          >
            Agregar Orden de Trabajo
          </h1>
          <div
            container
            rounded
            contenedorFormulario
            style={{
              height: "630px",
              width: "100%",
              background: "rgba(0, 0, 0, 0.40)",
              borderRadius: "1%",
            }}
          >
            <div className="container-sm">
              <form>
                <div>
                  <h3
                    className="letrasFormularioOrdenes"
                    style={{ paddingTop: "2%" }}
                  >
                    Nombre Completo{" "}
                  </h3>
                  <input
                    placeholder="Ingrese Nombre"
                    className="form-control rounded"
                    name="nombre"
                    onChange={handleInputChance}
                    id="a_nombre"
                    style={{width:"40%"}}
                    required
                  ></input>
                </div>
                <div>
                  <h3
                    className="letrasFormularioOrdenes"
                    style={{ paddingTop: "1%" }}
                  >
                    No. Contacto{" "}
                  </h3>
                  <input
                    placeholder="Numero de contacto"
                    className="form-control rounded"
                    type="number"
                    name="numero_telefono"
                    onChange={handleInputChance}
                    id="a_contacto"
                    style={{width:"40%"}}
                    required
                  ></input>
                </div>
                <div>
                  <h3
                    className="letrasFormularioOrdenes"
                    style={{ paddingTop: "1%" }}
                  >
                    Cantidad de Unidades{" "}
                  </h3>
                  <input
                    placeholder="Unidades"
                    className="form-control propiedadUnidades rounded"
                    type="number"
                    name="cantidad_unidades"
                    onChange={handleInputChance}
                    id="a_cantidad"
                    required
                  ></input>
                </div>
                <div>
                  <h3
                    className="letrasFormularioOrdenes"
                    style={{ paddingTop: "1%" }}
                  >
                    Descripción
                  </h3>
                  <textarea
                    className="propiedadTextArea form-control"
                    name="descripcion"
                    id="a_descripcion"
                    onChange={handleInputChance}
                    placeholder="Si tienes comentarios adicionales o un metodo de contacto adicional, puedes especificarlos..."
                    style={{width:"70%"}}
                  ></textarea>
                </div>

                <form name="tipo_vivienda" onChange={handleInputChance}>
                  <h3
                    className="letrasFormularioOrdenes"
                    style={{ paddingTop: "1%" }}
                  >
                    Seleccione el Tipo de Servicio
                  </h3>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tipo_vivienda"
                      id="Radios1"
                      value="Casa"
                      id="a_tipo"
                    />
                    <label
                      class="form-check-label letrasFormularioOrdenes"
                      for="Radios1"
                    >
                      Casa
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tipo_vivienda"
                      id="Radios2"
                      id="a_tipo"
                      value="Negocio"
                    />
                    <label
                      class="form-check-label letrasFormularioOrdenes"
                      for="Radios2"
                    >
                      Negocio
                    </label>
                  </div>
                </form>

                <form class="row g-3">
                  <h3
                    className="letrasFormularioOrdenes"
                    style={{ paddingTop: "1%" }}
                  >
                    Empleado(s)
                  </h3>
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
                      <option selected>Seleccione un Empleado</option>
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
                <div>
                  <Link to="/adminOrders">
                    <button
                      type="submit"
                      className="btn btn-danger"
                      style={{ marginLeft: "56%", marginRight: "2%" }}
                    >
                      Volver
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSubmit}
                  >
                    Realizar Orden
                  </button>

                  <Link to="/modificarOrden">
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      style={{ marginLeft: "2%", marginRight: "2%" }}
                    >
                      Administrar Ordenes de Trabajo
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      </div>
    </>
  );
};

export default AgregarOrden;
