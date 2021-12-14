import React, { Component } from "react";
import {logout} from "../components/firebase";
import { SidebarData } from "./Management/SideBarData";
import logo from "../img/logo.png";

export class NavAdmin extends Component {  
    render() {
        return (
          <div>
              
<nav className="navbar navbar-expand-lg navbar-dark bg-dark  fixed-top sticky-top">
<a class="navbar-brand" style={{margin: "0px 10px"}} href="/">Ackleaners Administracion</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto" style={{}}>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className="nav-item">
                <a href={item.path}  className="nav-link m-2 menu-item nav-active text-light">
                  <span>{item.title}</span>
                </a>
              </li>
            );
          })}
          
          <li key="keysignout" className="nav-item" onClick={logout}>
            <a href="/"  className="nav-link m-2 menu-item nav-active text-light">
              <span>Salir</span>
            </a>
          </li>

        </ul>
        </div>
      </nav>
    
          </div>
        );
      }
    }


export default NavAdmin;
