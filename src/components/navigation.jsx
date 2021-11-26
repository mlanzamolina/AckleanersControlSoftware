import React, { Component } from "react";
import logo from "../img/ack.png"

class Navigation extends Component {
  
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light  bg-light  navbar-fixed-top sticky">
        
        <div className="container">
        <a class="navbar-brand" href="#">
      <img src={logo} alt="..." />
    </a>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
                <a href="#features" className="nav-link active">
                  Servicios
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link active">
                  Sobre Nosotros
                </a>
              </li>
              <li className="nav-item">
                <a href="#portfolio" className="nav-link active">
                  Fotos
                </a>
              </li>
              <li className="nav-item">
                <a href="#testimonials" className="nav-link active">
                Reseñas
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link active">
                  Contactenos
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
