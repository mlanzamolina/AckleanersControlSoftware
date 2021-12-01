import React, { useRef, Component } from "react";
import * as emailjs from "emailjs-com";
import swal from "sweetalert";

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
          swal({
            title: "Realizado",
            text: "Se envio al correo ackleaners@gmail.com",
            icon: "success",
            button: "aceptar",
          });
        },
        function (err) {
          swal({
            title: "No Realizado",
            text: "No se pudo enviar el correo",
            icon: "warning",
            button: "aceptar",
          });
        }
      );
  };

  render() {
    return (
      <div id="contact">
        <br /><br /><br /><br /><br /><br /><br />
        <div class="containerf">
          <h2 style={{ textAlign: "center" }}>Programe su cita!</h2><br />
        
            <div class="rowf">
              <div class="col-25f">
                <label for="fname">Nombre</label>
              </div>
              <div class="col-75f">
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChangeName}
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
                  name="email"
                  ref="email"
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
                  type="number"
                  name="phone"
                  ref="phone"
                  onChange={this.handleChangePhone}
                />
              </div>
            </div>
            <div class="rowf">
              <div class="col-25f">
                <label for="subject">Subject</label>
              </div>
              <div class="col-75f">
                <input
                id="subjectin"
                  type="textarea"
                  name="message"
                  ref="message"
                  onChange={this.handleChangeMessage}
                />
              </div>
            </div>
            <div class="rowf">
              <br />
              <button type="submit" id="btnSend" className="btn btn-primary" style={{float: "right"}} onClick={this.sendMail}>
                Send Email
              </button>
            </div>
         
        </div>
      </div>
    );
  }
}

export default Contact;
