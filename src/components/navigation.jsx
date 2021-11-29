import React, { Component } from "react";
import logo from "../img/ack.png";
import "./marco.css";

class Navigation extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top sticky-top ">
        <a class="navbar-brand" style={{}} href="#">
          <img src={logo} id="navbar-brandti" alt="..." />
        </a>
        <a
          class="navbar-brand"
          target="_blank"
          style={{}}
          href="https://web.whatsapp.com/send?phone=+50432868726"
        >
          <img
            src="https://1000marcas.net/wp-content/uploads/2019/11/WhatsApp-logo.png"
            width="90vw"
            alt="..."
          />
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
          <ul class="navbar-nav ms-auto" style={{}}>
            <li class="active" class="nav-item">
              <a
                href="#features"
                class="nav-link m-2 menu-item nav-active text-light"
              >
                Servicios
              </a>
            </li>

            <li class="nav-item">
              <a
                href="#about"
                class="nav-link m-2 menu-item nav-active text-light"
              >
                Sobre Nosotros
              </a>
            </li>

            <li class="nav-item">
              <a
                href="#fotos"
                class="nav-link m-2 menu-item nav-active text-light"
              >
                Fotos
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#contact"
                class="nav-link m-2 menu-item nav-active text-light"
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
