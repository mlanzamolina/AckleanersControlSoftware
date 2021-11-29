import React, { Component } from "react";
import logo from "../img/ack.png";
import "./marco.css";

class Navigation extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top sticky-top">
        <a class="navbar-brandt" style={{ padding: "0px" }} href="#">
          <img src={logo} id="navbar-brandti" alt="..." />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="active" class="nav-item">
              
              <a
                href="#features"
                class="nav-link m-2 menu-item nav-active text-dark"
              >
                Servicios
              </a>
            </li>

            <li class="nav-item">
              <a
                href="#about"
                class="nav-link m-2 menu-item nav-active text-dark"
              >
                Sobre Nosotros
              </a>
            </li>

            <li class="nav-item">
          
              <a
                href="#fotos"
                class="nav-link m-2 menu-item nav-active text-dark"
              >
                Fotos
              </a>
            </li>
            <li class="nav-item">
              
              <a
                href="#contact"
                class="nav-link m-2 menu-item nav-active text-dark"
              >
                Contactenos
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
