import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navigation extends Component {
  render() {
    return (
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">
              Ackleaners Landing Page
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#features" className="page-scroll">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#about" className="page-scroll">
                  SOBRE NOSOTROS
                </a>
              </li>
              <li>
                <a href="#portfolio" className="page-scroll">
                  Fotos
                </a>
              </li>
              <li>
                <a href="#testimonials" className="page-scroll">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="page-scroll">
                  Contactenos
                </a>
              </li>
              <Link id="link" to="/Login">
                Login
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
