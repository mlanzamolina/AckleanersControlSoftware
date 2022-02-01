import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, updateDoc, doc } from "@firebase/firestore";
import { db, dbOrdenes } from "../..//components/firebase";
import logo from "../../img/logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import "./Formulario.css";
import swal from "sweetalert";
import Nav from "../NavAdmin";

const ModificarOrden = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [dats, setDatos] = useState({
        nombre: " ",
        numero_telefono: " ",
        cantidad_unidades: " ",
        descripcion: " ",
        estado: "Pendiente"
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
        {
            idField: "id",
            estadoField: "estado"
        }
    );

    const completarOrden = async (id, estado) => {
        const ordenesDoc = doc(dbOrdenes, "OrdenesTrabajo", id)
        const nuevoEstado = { estado: "Completado" };
        await updateDoc(ordenesDoc, nuevoEstado)
        swal({
            title: "Completada",
            text: "Orden de trabajo completada",
            icon: "info",
            button: "Aceptar"
        });
        
    };

    return (
        <>
            <Nav></Nav>
      <div class="sidebar">
        <a href="/Ordenes">Ordenes</a>
        <a href="/ListarOrdenes">Listar ordenes</a>
        <a href="/AgregarOrden">Agregar ordenes</a>
        <a class="active" href="/ModificarOrden">Modificar ordenes</a>
      </div>
            <Fragment>
                <div class="contentf">
                    <h1 className="tituloh1">Soy modificar</h1>
                    <table className="ta" align="center">
                        <thead>
                            <tr className="ta">
                                <th scope="col">Nombre </th>
                                <th scope="col">Unidades</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados
                                ? empleados.map((item) => {
                                    return (
                                        <tr className="ta" key={item.id}>
                                            <td>{item.nombre}</td>
                                            <td>{item.cantidad_unidades}</td>
                                            <td>{item.descripcion}</td>
                                            <td>{item.numero_telefono}</td>
                                            <td>{item.estado} <button onClick={() => {
                                                completarOrden(item.id,
                                                    item.estado)
                                            }
                                            }>Completar</button> </td>
                                        </tr>
                                    );
                                })
                                : null}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        </>
    );
};

export default ModificarOrden;

