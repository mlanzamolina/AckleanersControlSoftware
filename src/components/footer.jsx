import React, { Component } from "react";

export class footer extends Component {
  render() {
    return (
      <>
        <footer className="relative bg-blueGray-200 pt-8 pb-6">
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
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap text-center lg:text-left">
              <div className="w-full lg:w-6/12 px-4">
                <h4 className="text-3xl font-semibold">
                  ¡Mantente en contacto!
                </h4>
                <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                  Encuentranos en redes sociales.
                </h5>
                <div className="mt-6 lg:mb-0 mb-6">
                  <a
                    target="_blank"
                    style={{}}
                    href="https://www.facebook.com/Ackleaners-106521830930162"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1200px-Facebook_icon.svg.png"
                      width="90vw"
                      alt="..."
                    />
                  </a>
                  <a
                    target="_blank"
                    style={{}}
                    href="https://www.instagram.com/ackleaners/"
                  >
                    <img
                      src="https://aegean600.com/wp-content/uploads/instagram-logo.png"
                      width="96vw"
                      alt="..."
                    />
                  </a>
                </div>
              </div>
            </div>
            <hr className="my-6 border-blueGray-300" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Copyright © {new Date().getFullYear()} ACkleaners by{" "}
                  <a>ACkleaners</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default footer;
