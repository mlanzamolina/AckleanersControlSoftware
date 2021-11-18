import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SideBarData';
import "./Formulario.css";

const ListarEmpleado = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
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
            // [event.target.dni] : event.target.value,
            // [event.target.number] : event.target.value,
            // [event.target.email] : event.target.value
        });
    };

    const enviarDatos = (event) => {
        event.preventDefault();
        console.log(
            dats.nombre + " " + dats.id + " " + dats.numero + " " + dats.correo
        );
    };
    const [empleado,setEmpleado]=useState({
        results:[
            {
                "nombre":"Rodrigo",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"rodrio.bardales@unitec.edu"
            },
            {
                "nombre":"Marco",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"marcos.lanzas@unitec.edu"
            },
            {
                "nombre":"Michael",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"michael.algo@unitec.edu"
            },
            {
                "nombre":"Michael",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"michael.algo@unitec.edu"
            },
            {
                "nombre":"Michael",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"michael.algo@unitec.edu"
            },
            {
                "nombre":"Michael",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"michael.algo@unitec.edu"
            },
            {
                "nombre":"Michael",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"michael.algo@unitec.edu"
            },
            {
                "nombre":"Michael",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"michael.algo@unitec.edu"
            },
            {
                "nombre":"Michael",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"michael.algo@unitec.edu"
            },
            {
                "nombre":"Michael",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"michael.algo@unitec.edu"
            },
            {
                "nombre":"Michael",
                "id":"05514198005047",
                "numero":"32458277",
                "correo":"michael.algo@unitec.edu"
            },
        ]
    })

    return (
        <>
        <div className="dropdown" style={{float: 'right',}}>
  <button class="dropbtn">Opciones</button>
  <div class="dropdown-content">
  <a href="/ListarEmpleado">Listar Empleado</a>
  <a href="/AgregarEmpleado">AgregarEmpleado</a>
  <a href="/ModificarEmpleado">ModificarEmpleado</a>
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
                <h1 className="tituloh1">Listar Empleado</h1>
                <table  className="ta" align="center">
                    <thead>
                    <tr className="ta">
                        <th scope="col">Nombre De Empleado</th>
                        <th scope="col">Numero de Identidad</th>
                        <th scope="col">Numero de Telefono</th>
                        <th scope="col">Correo Electronico</th>
                    </tr>
                    </thead>    
                    <tbody>
                    {empleado.results.map((item) => {
                        return (
                        <tr className="ta">
                            <td >{item.nombre}</td>
                            <td >{item.id}</td>
                            <td >{item.numero}</td>
                            <td>{item.correo}</td>
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

export default ListarEmpleado;
