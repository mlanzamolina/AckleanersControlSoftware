import React, { Component } from "react";
import Iframe from "react-iframe";

export class features extends Component {
  render() {
    return (
      <>
        <section className="relative py-20">
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
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://habitosaludablesonline.com/wp-content/uploads/2020/01/omo-limpiar-el-aire-acondicionado-680x350.png"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                  </div>
                  <h3 className="text-3xl font-semibold">
                    ¿Por qué limpiar mi aire acondicionado?
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500" style={{ color: "black", textAlign: "justify" }}>
                    Limpiar tu aire no solo ayuda a que pueda llegar a
                    temperaturas más frias, tambien tiene otros beneficios que
                    tal vez no sabias.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500" style={{ color: "black" }}>
                            Mejor calidad de aire
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fab"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500" style={{ color: "black" }}>
                            Ahorro de energia
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="far"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500" style={{ color: "black" }}>
                            Evita malos olores
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>


      </>
    );
  }
}

export default features;
