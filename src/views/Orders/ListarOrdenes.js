import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
import { db } from "../..//components/firebase";
import logo from "../../img/logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import "./Formulario.css";
import Nav from "../NavAdmin";

const ListarOrdenes = () => {
  const [dats, setDatos] = useState({
    nombre: " ",
    numero_telefono: " ",
    cantidad_unidades: " ",
    descripcion: " ",
  });

  const handleInputChance = (event) => {
    console.log(event.target.value);
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
  };

  const [empleados, loading, error] = useCollectionData(
    collection(db, "OrdenesTrabajo"),
    { idField: "id" }
  );

  return (
    <>
    <Nav></Nav>
    
      <Fragment>
        <div class="contentf">
        <h1 style={{
            width:"100%",
            textAlign:"center", 
            marginTop:"1%", 
            marginBottom:"30px",
            borderBottom:"2px solid black"
          }}
            >Ordenes de Trabajo</h1>
          <table className="table table-dark" align="center">
            {/*<table className="ta" align="center">*/}
            <thead>
              <tr>
                {/*<tr className="ta">*/}
                <th scope="col">Nombre </th>
                <th scope="col">Unidades</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {empleados
                ? empleados.map((item) => {
                    return (
                      <tr key={item.id}>
                        {/*<tr className="ta" key={item.id}>*/}
                        <td>{item.nombre}</td>
                        <td>{item.cantidad_unidades}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.numero_telefono}</td>
                        <td>{item.estado}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <Link to="/adminOrders">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    style={{ marginBottom: "5%", marginLeft: "90%" }}
                  >
                    Regresar
                  </button>
                  </Link>
        </div>
        
      </Fragment>
    </>
  );
};

export default ListarOrdenes;
