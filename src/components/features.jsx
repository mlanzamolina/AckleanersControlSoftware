import React, { Component } from "react";
import Iframe from "react-iframe";

export class features extends Component {
  render() {
    return (
      // <div id="features" className="text-center">
      //   <br /> <br />
      //   <h2 style={{ padding: "42px" }}>Servicios</h2>
      //   <div className="container">
      //     <div className=""></div>
      //     <div className="row">
      //       {this.props.data
      //         ? this.props.data.map((d, i) => (
      //             <div style={{ padding: "50px" }} className="col-sm" key={i}>
      //               <i className={d.icon} />
      //               <h3>{d.title}</h3>
      //               <p>{d.text}</p>
      //               <div>
      //                 <iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F106521830930162%2Fvideos%2F417711099124406%2F&show_text=false&width=560&t=0" />
      //               </div>
      //             </div>
      //           ))
      //         : "Loading..."}
      //     </div>
      //   </div>
      // </div>

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
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Limpiar tu aire no solo ayuda a que pueda llegar a
                    temperaturas mas frias, tambien tiene otros beneficios que
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
                          <h4 className="text-blueGray-500">
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
                          <h4 className="text-blueGray-500">
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
                          <h4 className="text-blueGray-500">
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
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default features;
