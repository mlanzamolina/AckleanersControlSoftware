import React, { Component } from "react";
import pics1 from "../img/01.jpg";
import pics2 from "../img/02.jpg";
import pics3 from "../img/03.jpg";
import pics4 from "../img/04.jpg";


export class Gallery extends Component {
  render() {
    return (
      <>

     <div id="fotos" className="fotos">
     <br />  <br />  <br />  <br />
      <div id="rowg">
      <h2 style={{textAlign: "center"}}>Fotos</h2><br /> <br /> <br /> <br /> 
        <div className="columng" style={{}}>
          <img src={pics1} /> 
        <img src={pics2} />
        <img src={pics3} />
        <img src={pics4} />
        </div>
      </div>
     
      </div>
      </>
    );
  }
}

export default Gallery;
