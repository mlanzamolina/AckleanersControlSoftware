import React, { Component } from "react";
import about from "../img/headerpic2.png"

export class Header extends Component {
  render() {
    return (
     <>
   <div id="headerm">
       <img src={about} alt="" width= "100%"/>
       <div className="centered" ><a href="#features" className="myButtonm"><h2>Nuestros servicios</h2></a></div>
       <div className="centered2"><a href="#contact" className="myButtonm"><h2>Contactenos</h2></a></div>
    </div>
     </>
    );
  }
}

export default Header;
