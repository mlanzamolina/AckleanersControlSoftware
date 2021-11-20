import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SideBarData';
import "./Formulario.css";

const ListarOrdenes = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const [dats, setDatos] = useState({
        nombre: " ",
        unidades: " ",
        descripcion: " ",
        fecha: " ",
    });

    const handleInputChance = (event) => {
        console.log(event.target.value);
        setDatos({
            ...dats,
            [event.target.name]: event.target.value,
            // [event.target.dni] : event.target.value,
            // [event.target.number] : event.target.value,
            // [event.target.email] : event.target.value
        });
    };

    const enviarDatos = (event) => {
        event.preventDefault();
        console.log(
            dats.nombre + " " + dats.unidades + " " + dats.descripcion + " " + dats.fecha
        );
    };
    const [ordenes, setOrdenes] = useState({
        results: [
            {
                "nombre": "Rodrigo ",
                "unidades": "3",
                "descripcion": "Muy buen producto",
                "fecha": "11/19/2021"
            },
            {
                "nombre": "Marco",
                "unidades": "4",
                "descripcion": "bueno",
                "fecha": "11/19/2021"
            },

        ]
    })

    return (
        <>
            <div className="dropdown" style={{ float: 'right', }}>
                <button class="dropbtn">Opciones</button>
                <div class="dropdown-content">
                    <a href="/ListarOrdenes">Listar Ordenes</a>
                    <a href="/ModificarOrdenes">Modificar Ordenes</a>
                    <a href="/AgregarOrdenes">Agregar Ordenes</a>
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
                <div className='managementsidemenu'>
                    <Link to='#' className='managementmenu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'managementnav-menu active' : 'managementnav-menu'}>
                    <ul className='managementnav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='managementmenu-bars'>
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
                <div  >
                    <h1 className="tituloh1">Listar Ordenes de Trabajo</h1>
                    <table className="ta" align="center">
                        <thead>
                            <tr className="ta">
                                <th scope="col">Nombre del Cliente</th>
                                <th scope="col">Unidades</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenes.results.map((item) => {
                                return (
                                    <tr className="ta">
                                        <td >{item.nombre}</td>
                                        <td >{item.unidades}</td>
                                        <td >{item.descripcion}</td>
                                        <td>{item.fecha}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {/* <h3>{dats.nombre}-{dats.id}-{dats.numero}-{dats.correo}</h3> */}
            </Fragment>
        </>
    );
};

export default ListarOrdenes;
