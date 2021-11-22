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

const ModificarOrden = () => {
    const [sidebar, setSidebar] = useState(false);
    const tablaOrdenesRef = collection(dbOrdenes, "OrdenesTrabajo");
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
            <div className="dropdown" style={{ float: "right" }}>
                <button className="dropbtn">Opciones</button>
                <div className="dropdown-content">
                    <a href="/ListarOrdenes">Listar Ordenes</a>
                    <a href="/AgregarOrden">Agregar Orden</a>
                    <a href="/ModificarOrden">Modificar Ordenes</a>
                </div>
            </div>
            <Fragment>
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
                <div className="managementsidemenu">
                    <Link to="#" className="managementmenu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav
                    className={
                        sidebar ? "managementnav-menu active" : "managementnav-menu"
                    }
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
                <div>
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

