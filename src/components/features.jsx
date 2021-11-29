import React, { Component } from "react";
import Iframe from "react-iframe";

export class features extends Component {
  render() {
    return (
      <div id="features" className="text-center">
        <br />
           <h2 style={{ padding: "42px" }}>Servicios</h2>
        <div className="container">
          <div className="">
         
          </div>
          <div className="row">
            {this.props.data
              ? this.props.data.map((d, i) => (
                  <div style={{ padding: "50px" }} className="col-sm" key={i}>
                    <i className={d.icon} />
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                    <div>
          <iframe
            src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F106521830930162%2Fvideos%2F417711099124406%2F&show_text=false&width=560&t=0" /> 
         </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        

        </div>
      </div>
    );
  }
}

export default features;
