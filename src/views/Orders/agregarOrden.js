import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SideBarData';
import "./Formulario.css";

const AgregarOrden = () => {
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

    return (
        <>
            <div className="dropdown" style={{ float: 'right', }}>
                <button class="dropbtn">Opciones</button>
                <div class="dropdown-content">
                    <a href="/ListarOrdenes">Listar Ordenes</a>
                    <a href="/ModificarOrdenes">Modificar Ordenes</a>
                    <a href="/AgregarOrden">Agregar Ordenes</a>
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
                <div>
                    <h1 className="tituloh1">Soy agregar ordenes</h1>
                </div>
            </Fragment>

        </>
    );
};

export default AgregarOrden;
