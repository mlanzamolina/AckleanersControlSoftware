import React, { Component } from "react";
import logo from "../img/ack.png";
import "./marco.css";

class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top sticky-top ">
        <a className="navbar-brand" style={{}} href="#">
          <img src={logo} id="navbar-brandti" alt="..." />
        </a>
        <a
          className="navbar-brand"
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
            <li className="active" className="nav-item">
              <a
                href="#features"
                className="nav-link m-2 menu-item nav-active text-light"
              >
                Servicios
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#about"
                className="nav-link m-2 menu-item nav-active text-light"
              >
                Sobre Nosotros
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#fotos"
                className="nav-link m-2 menu-item nav-active text-light"
              >
                Fotos
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className="nav-link m-2 menu-item nav-active text-light"
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
