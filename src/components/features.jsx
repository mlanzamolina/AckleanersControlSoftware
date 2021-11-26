import React, { Component } from "react";
import Iframe from "react-iframe";

export class features extends Component {
  render() {
    return (
      <div id="features" className="text-center">
        <div className="container">
          <div className="">
            <h2 style={{ padding: "42px" }}>Servicios</h2>
          </div>
          <div className="row">
            {this.props.data
              ? this.props.data.map((d, i) => (
                  <div style={{ padding: "20px" }} className="col-sm" key={i}>
                    <i className={d.icon} />
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                ))
              : "Loading..."}
          </div>
          <iframe
            src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F106521830930162%2Fvideos%2F417711099124406%2F&show_text=false&width=560&t=0"
            width="852px"
            height="480px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </div>
      </div>
    );
  }
}

export default features;
