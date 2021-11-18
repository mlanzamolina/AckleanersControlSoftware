import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import logo from "../../img/logo.png"


export default function Ordenes() {
    const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);


  return (
    <>
    <div className="dropdown" style={{float: 'right',}}>
  <button class="dropbtn">Opciones</button>
  <div class="dropdown-content">
  <a href="/ListarOrdenes">Listar Ordenes</a>
  <a href="/ModificarOrdenes">Modificar Ordenes</a>
  <a href="/AgregarOrdenes">Agregar Ordenes</a>
  </div>
</div>
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
        <h1 style={{textAlign: 'center',}}>Manage ordenes funciona</h1>
        <a href="/"><img src={logo} alt="logo ackleaners" width="250" style={{
              margin: 0,
              top: "auto",
              right: 45,
              bottom: 40,
              position: "fixed",
            }}/></a> 
    </>
  );
}
