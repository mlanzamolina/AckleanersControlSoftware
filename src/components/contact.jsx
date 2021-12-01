import React, { Component } from "react";
import PropTypes from "prop-types";

export class Contact extends Component {
  static propTypes = {};
  

  render() {
    return (
      <div id="contact">
      <div class="containerf">
      <h2 style={{textAlign: "center"}}>Programe su cita!</h2> 
        <form >
          <div class="rowf">
            <div class="col-25f">
              <label for="fname">Nombre</label>
            </div>
            <div class="col-75f">
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Escribe tu nombre.."
              />
            </div>
          </div>
          <div class="rowf">
            <div class="col-25f">
              <label for="country">Email</label>
            </div>
            <div class="col-75f">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Escribe tu correo electronico.."
              />
            </div>
          </div>
          <div class="rowf">
            <div class="col-25f">
              <label for="telefono">Tel.</label>
            </div>
            <div class="col-75f">
              <input
                type="text"
                id="telefono"
                name="Telefono"
                placeholder="Escribe tu telefono.."
              />
            </div>
          </div>
          <div class="rowf">
            <div class="col-25f">
              <label for="subject">Subject</label>
            </div>
            <div class="col-75f">
              <textarea
                id="subject"
                name="subject"
                placeholder="Write something.."
                style={{ height: "200px" }}
              ></textarea>
            </div>
          </div>
          <div class="rowf">
          <button type="submit" class="btn btn-primary" style={{float: "left"}}>Submit</button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default Contact;
