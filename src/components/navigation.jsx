import React, { Component } from "react";
import logo from "../img/ack.png";
import "./marco.css"


class Navigation extends Component {
  render() {
    return (
      <nav class="navbar navbar-inverse navbar-expand-sm bg-light navbar-light navbar-fixed-top sticky">
        <div class="container-fluid">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar"
            >
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brandt" style={{padding: "0px"}} href="#">
              <img src={logo} id="navbar-brandti" alt="..." />
            </a>
          </div>
          <div class="collapse navbar-collapse " id="myNavbar">
            <ul class="nav ms-auto justify-content-end">
              <li class="active" class="nav-item">
                {" "}
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
                {" "}
                <a
                  href="#portfolio"
                  class="nav-link m-2 menu-item nav-active text-dark"
                >
                  Fotos
                </a>{" "}
              </li>
              <li class="nav-item">
                {" "}
                <a
                  href="#contact"
                  class="nav-link m-2 menu-item nav-active text-dark"
                >
                  Contactenos
                </a>{" "}
              </li>
              <li class="nav-item">
                {" "}
                <a
                  href="#testimonials"
                  class="nav-link m-2 menu-item nav-active text-dark"
                >
                  Reseñas
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
