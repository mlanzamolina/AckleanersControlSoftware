import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import { dbOrdenes, db } from "../../components/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "firebase/firestore";
import "./Formulario.css";
import swal from "sweetalert";
import Nav from "../NavAdmin";

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
    estado: "Pendiente",
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
        button: "aceptar",
      });
    }
  };

  const handleSubmit = async (e) => {
    //console.log(JSON.stringify(dats))
    if (
      dats.descripcion == " " ||
      dats.numero_telefono == " " ||
      dats.cantidad_unidades == " " ||
      orden_emps.length === 0
    ) {
      swal({
        title: "No se realizo",
        text: "No se agregro una orden de trabajo",
        icon: "warning",
        button: "aceptar",
      });
    } else {
      await addDoc(tablaOrdenesRef, {
        nombre: dats.nombre,
        numero_telefono: dats.numero_telefono,
        cantidad_unidades: dats.cantidad_unidades,
        descripcion: dats.descripcion,
        estado: dats.estado,
        empleados: orden_emps,
      });
      setOrden_emps([]);
      swal({
        title: "Realizado",
        text: "Se agregro una orden de trabajo",
        icon: "info",
        button: "aceptar",
      });
    }
  };

  return (
    <>
      <Nav />
      <div class="sidebar">
        <a href="/Ordenes">Ordenes</a>
        <a href="/ListarOrdenes">Listar Ordenes</a>
        <a class="active" href="/AgregarOrden">
          Agregar Orden
        </a>
        <a href="/ModificarOrden">Modificar Orden</a>
      </div>
      <div className="contentf">
        <Fragment>
          <h1 className="tituloh1">Agregar Orden de Trabajo</h1>

          <div className="container-sm">
            <form>
              <div>
                <h3 className="letra">Nombre Completo </h3>
                <input
                  placeholder="Ingrese Nombre"
                  className="form-control"
                  name="nombre"
                  onChange={handleInputChance}
                  required
                ></input>
              </div>
              <div>
                <h3 className="letra">No. Contacto </h3>
                <input
                  placeholder="Numero de contacto"
                  className="form-control"
                  type="number"
                  name="numero_telefono"
                  onChange={handleInputChance}
                  required
                ></input>
              </div>
              <div>
                <h3 className="letra">Cantidad de unidades </h3>
                <input
                  placeholder="Unidades"
                  className="form-control propiedadUnidades"
                  type="number"
                  name="cantidad_unidades"
                  onChange={handleInputChance}
                  required
                ></input>
              </div>
              <div>
                <h3 className="letra">Descripcion </h3>
                <textarea
                  className="propiedadTextArea form-control"
                  name="descripcion"
                  onChange={handleInputChance}
                  placeholder="Si tienes comentarios adicionales o un metodo de contacto adicional, puedes especificarlos..."
                ></textarea>
              </div>
              <form class="row g-3">
                <h3 className="letra">Empleados a Trabajar</h3>
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
              <div>
                <Link to="/">
                  <button type="submit" className="btn btn-danger">
                    Salir
                  </button>
                </Link>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Realizar Orden
                </button>
              </div>
            </form>
          </div>
        </Fragment>
      </div>
    </>
  );
};

export default AgregarOrden;
