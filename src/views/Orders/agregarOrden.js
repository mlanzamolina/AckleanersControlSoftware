import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import { dbOrdenes } from "../../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Formulario.css";
import swal from "sweetalert";

const AgregarOrden = () => {
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
        setDatos({
            ...dats,
            [event.target.name]: event.target.value,
        });
    };


    const handleSubmit = async (e) => {
        //console.log(JSON.stringify(dats))
        if (dats.descripcion == " " || dats.numero_telefono == " " || dats.cantidad_unidades == " ") {
            swal({
                title: "No se realizo",
                text: "No se agregro una orden de trabajo",
                icon: "warning",
                button: "aceptar"
            });
        } else {
            await addDoc(tablaOrdenesRef, {
                nombre: dats.nombre,
                numero_telefono: dats.numero_telefono,
                cantidad_unidades: dats.cantidad_unidades,
                descripcion: dats.descripcion,
                estado: dats.estado,
            });
            swal({
                title: "Realizado",
                text: "Se agregro una orden de trabajo",
                icon: "info",
                button: "aceptar"
            });
        }
    };

    return (
        <>
            <div className="dropdown" style={{ float: "right" }}>
                <button className="dropbtn">Opciones</button>
                <div className="dropdown-content">
                    <a href="/AgregarOrden">Agregar Orden</a>
                    <a href="/ModificarOrden">Modificar Orden</a>
                    <a href="/ListarOrdenes">Listar Orden</a>
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
                    <h1 className="tituloh1">Agregar Orden de Trabajo</h1>
                </div>

                <form className="col-md">
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
                        >
                        </textarea>
                    </div>
                    <div>

                    </div>
                    <div>
                        <Link to="/">
                            <button type="submit" className="btn btn-danger">
                                Salir
                            </button>
                        </Link>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Realizar Orden
                        </button>
                    </div>
                </form>
            </Fragment>
        </>
    );
};

export default AgregarOrden;
