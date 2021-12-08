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
import EmployeeNavigation from "./EmployeeNavigation";

const ListarEmpleado = () => {
  const [dats, setDatos] = useState({
    nombre: " ",
    id: " ",
    numero: " ",
    correo: " ",
  });

  const handleInputChance = (event) => {
    console.log(event.target.value);
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
  };

  const [empleados, loading, error] = useCollectionData(
    collection(db, "Empleados"),
    { idField: "id" }
  );

  return (
    <>
      <EmployeeNavigation></EmployeeNavigation>
        <div>
          <h1 className="tituloh1">Listar Empleado</h1>
          <table className="ta" align="center">
            <thead>
              <tr className="ta">
                <th scope="col">Nombre De Empleado</th>
                <th scope="col">DNI</th>
                <th scope="col">Numero de Telefono</th>
                <th scope="col">Correo Electronico</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {empleados
                ? empleados.map((item) => {
                    return (
                      <tr className="ta" key={item.id}>
                        <td>{item.nombre}</td>
                        <td>{item.dni}</td>
                        <td>{item.n_telefono}</td>
                        <td>{item.correo}</td>
                        <td>{item.estado}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default ListarEmpleado;
