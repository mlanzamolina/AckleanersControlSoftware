import React, { Component } from "react";

export class about extends Component {
  render() {
    return (

      <div id="about">
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i class="fa-solid fa-user-shield"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Seguridad</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Puedes estar tranquilo de que todo estará bien en casa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400"></div>
                    <h6 className="text-xl font-semibold">Conocimiento</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Siempre con los mejores métodos y las mejores herramientas para el trabajo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400"></div>
                    <h6 className="text-xl font-semibold">Tiempo de respuesta</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Nos comunicamos de la manera más rápida contigo para brindarte nuestros servicios.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  ¿Por qué elegirnos?
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600" style={{ textAlign: "justify" }} >
                  ACKleaners es una compañía joven diseñada para brindar una
                  solución al mantenimiento de unidades de aire acondicionadas,
                  las cuales están siendo cada vez exigidas por las altas
                  temperaturas en la zona. Somos una empresa familiar, centrada en
                  ofrecer el mejor servicio para todos nuestros clientes ya sea en
                  el hogar o en tu negocio.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src="../img/about.jpg"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-black">
                      Siempre lo mejor
                    </h4>
                    <p className="text-md font-light mt-2 text-black">
                      ¡Un buen servicio te deja dormir bien frio por la noche!
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default about;
