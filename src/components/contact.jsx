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
      // <div id="contact">
      //   <br /> <br />
      //   <div class="containerf">
      //     <h2 style={{ textAlign: "center" }}>Programe su cita!</h2>
      //     <br />

      //     <div class="rowf">
      //       <div class="col-25f">
      //         <label for="fname">Nombre</label>
      //       </div>

      //       <div class="col-75f">
      //         <input
      //           id="name"
      //           type="text"
      //           name="name"
      //           className="inputMarco"
      //           onChange={this.handleChangeName}
      //           required
      //         />
      //       </div>
      //     </div>

      //     <div class="rowf">
      //       <div class="col-25f">
      //         <label for="country">Email</label>
      //       </div>

      //       <div class="col-75f">
      //         <input
      //           required
      //           id="email"
      //           type="text"
      //           name="email"
      //           ref="email"
      //           className="inputMarco"
      //           onChange={this.handleChangeEmail}
      //         />
      //       </div>
      //     </div>

      //     <div class="rowf">
      //       <div class="col-25f">
      //         <label for="telefono">Tel.</label>
      //       </div>

      //       <div class="col-75f">
      //         <input
      //           id="tel"
      //           className="inputMarco"
      //           type="number"
      //           name="phone"
      //           ref="phone"
      //           onChange={this.handleChangePhone}
      //           required
      //         />
      //       </div>
      //     </div>

      //     <div class="rowf">
      //       <div class="col-25f">
      //         <label for="subject">Mensaje</label>
      //       </div>

      //       <div class="col-75f">
      //         <input
      //           id="msj"
      //           className="inputMarco"
      //           required
      //           type="textarea"
      //           name="message"
      //           ref="message"
      //           onChange={this.handleChangeMessage}
      //         />
      //       </div>
      //     </div>

      //     <div class="rowf">
      //       <br />
      //       <button
      //         type="submit"
      //         id="btnSend"
      //         className="btn btn-primary"
      //         style={{ float: "right" }}
      //         onClick={this.sendMail}
      //       >
      //         Enviar
      //       </button>
      //     </div>
      //   </div>
      // </div>

      <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
        <div className="container mx-auto px-4">
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
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Correo"
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
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
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
    );
  }
}

export default Contact;
