import React, { Component } from "react";
import about from "../img/headerpic2.png";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      //    <>
      //  <div id="headerm">
      //      <img src={about} alt="" width= "100%"/>
      //      <div className="centered" ><a href="#features" className="myButtonm"><h2>Nuestros servicios</h2></a></div>
      //      <div className="centered2"><a href="#contact" className="myButtonm"><h2>Contactenos</h2></a></div>
      //   </div>
      //    </>

      <>
      <div id="head">
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://ctern2eqfwc2z6wuq1ix1k1x-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/heater-blowing-cold-air.jpeg')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h1 className="text-white font-semibold text-5xl">
                      ACKLEANERS
                    </h1>
                    <p className="mt-4 text-lg text-blueGray-200">
                      ¡Cuidamos Tu Clima!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                // xmlns="http://www.w3.org/2000/svg"
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
          </div>
        </main>
        </div>
      </>
    );
  }
}

export default Header;
