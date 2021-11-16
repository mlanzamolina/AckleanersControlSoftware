import React, { Component } from "react";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";

class Whatsapp extends Component {
  render() {
    return (
      <>
        <div className="whatsapp">
        <Link
            id="link"
            to="/Login"
            style={{
              margin: 0,
              top: "auto",
              left: 20,
              top: 80,
              left: "auto",
              position: "fixed",
            }}
          >
         <button className="button">Login</button>
          </Link>
          <Link
            id="link"
            to="/Formulario"
            style={{
              margin: 0,
              top: "auto",
              left: 20,
              top: 160,
              left: "auto",
              position: "fixed",
            }}
          >
         <button className="button">Formulario</button>
          </Link>
          <Fab
            color="primary"
            aria-label="whatsapp"
            style={{
              margin: 0,
              top: "auto",
              right: 40,
              bottom: 40,
              left: "auto",
              position: "fixed",
            }}
          >
            <a
              id="whatsapp"
              href="https://web.whatsapp.com/send?phone=+50432868726"
              target="_blank"
            >
              {" "}
              <img
                src="https://1000marcas.net/wp-content/uploads/2019/11/WhatsApp-logo.png"
                alt="whatsapp"
                height="57"
              />{" "}
            </a>
          </Fab>
        </div>
      </>
    );
  }
}

export default Whatsapp;
