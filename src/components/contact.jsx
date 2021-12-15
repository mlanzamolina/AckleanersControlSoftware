import React, { useRef, Component } from "react";
import * as emailjs from "emailjs-com";
import swal from 'sweetalert2';
import check from "../img/check.png"

export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleChangePhone = (event) => {
    this.setState({
      phone: event.target.value,
    });
  };
  handleChangeMessage = (event) => {
    this.setState({
      message: event.target.value,
    });
  };
  sendMail = () => {
    var template_params = {
      name: this.state.name,
      email: this.state.email,
      tel: this.state.phone,
      subject: this.state.message,
    };
    console.log(template_params);

    emailjs
      .send(
        "service_07irwdr",
        "template_du2p4od",
        template_params,
        emailjs.init("user_swdEcicIxbn0pfLvSx9HE")
      )
      .then(
        function (response) {
          swal.fire({
            iconHtml: '<img src="'+check+'">',
            title: "Realizado",
            text: "Se envio al correo ackleaners@gmail.com",
            button: "aceptar",
          });
        },
        function (err) {
          swal.fire({
            title: "No Realizado",
            text: "No se pudo enviar el correo",
            icon: "warning",
            button: "aceptar",
          });
        }
      );
      document.getElementById("msj").value=null;
      document.getElementById("tel").value=null;
      document.getElementById("name").value=null;
      document.getElementById("email").value=null;
      
  };

  render() {
    return (
      <div id="contact">
        <br />  <br />
        <div class="containerf">
          <h2 style={{ textAlign: "center" }}>Programe su cita!</h2>
          <br />

          <div class="rowf">
            <div class="col-25f">
              <label for="fname">Nombre</label>
            </div>

            <div class="col-75f">
              <input id="name" type="text" name="name" className="inputMarco" onChange={this.handleChangeName} required/>
            </div>
          </div>

          <div class="rowf">
            <div class="col-25f">
              <label for="country">Email</label>
            </div>

            <div class="col-75f">
              <input
required id="email"
                type="text"
                name="email"
                ref="email"
                className="inputMarco"
                onChange={this.handleChangeEmail}
              />
            </div>
          </div>

          <div class="rowf">
            <div class="col-25f">
              <label for="telefono">Tel.</label>
            </div>

            <div class="col-75f">
              <input
              id="tel"
                className="inputMarco"
                type="number"
                name="phone"
                ref="phone"
                onChange={this.handleChangePhone}required
              />
            </div>
          </div>

          <div class="rowf">
            <div class="col-25f">
              <label for="subject">Mensaje</label>
            </div>

            <div class="col-75f">
              <input
                id="msj"
                className="inputMarco"required
                type="textarea"
                name="message"
                ref="message"
                onChange={this.handleChangeMessage}
              />
            </div>
          </div>

          <div class="rowf">
            <br />
            <button
              type="submit"
              id="btnSend"
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={this.sendMail}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
