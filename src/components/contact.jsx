import React, { useRef, Component } from "react";
import * as emailjs from "emailjs-com";
import swal from "sweetalert2";
import check from "../img/check.png";

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
            iconHtml: '<img src="' + check + '">',
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
    document.getElementById("msj").value = null;
    document.getElementById("tel").value = null;
    document.getElementById("name").value = null;
    document.getElementById("email").value = null;
  };

  render() {
    return (
      <div id="contact">
        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Contactanos!
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  Para que esperar si nos podes hablar ya y reservar la limpieza
                  de tu aire.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Instalacion
                </h6>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Limpieza
                </h5>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Reparacion
                </h5>
                <h5>
                  s
                </h5>
              </div>
            </div>
          </div>
        </section>

        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">Nos reservas?</h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Llena estos datos para poder comunicarte con nosotros!
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Nombre"
                        onChange={this.handleChangeName}
                        id="name"
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Celular
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Celular"
                        onChange={this.handleChangePhone}
                        id="tel"
                        required
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Correo
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Correo"
                        onChange={this.handleChangeEmail}
                        id="email"
                        required
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Mensaje
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Danos tu mensaje..."
                        onChange={this.handleChangeMessage}
                        id="msj"
                        style = {{resize :"none"}}
                        required
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={this.sendMail}

                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Contact;
