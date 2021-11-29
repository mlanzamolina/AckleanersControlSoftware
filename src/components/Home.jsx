import React, { Component } from "react";
import Navigation from "./navigation";
import Header from "./header";
import Features from "./features";
import About from "./about";
import Gallery from "./gallery";
import Testimonials from "./testimonials";
import Contact from "./contact";
import Whatsapp from "./whatsapp";
import data from "../data/data";
import logo from "../img/logo.png"
export class Home extends Component {
  state = {
    resumeData: {},
  };
  componentDidMount() {
    this.setState({ resumeData: data });
  }
  

  render() {
    return (
        <div>
           <Whatsapp />
        <Navigation />
        <Header data={this.state.resumeData.Header} />
        <Features data={this.state.resumeData.Features} /> <br /> <br /> <br /> <br /> 
        <About data={this.state.resumeData.About} /> <br /><br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> 
        <Gallery /> <br /><br /><br /><br /><br /><br /><br /><br />
        <Testimonials data={this.state.resumeData.Testimonials} /> 
        <Contact />
       
      </div>
    );
  }
}

export default Home;
