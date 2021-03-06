import React, { Component } from "react";
import Navigation from "./navigation";
import Header from "./header";
import Features from "./features";
import About from "./about";
import Gallery from "./gallery";
import Testimonials from "./testimonials";
import Contact from "./contact";
import Whatsapp from "./whatsapp";
import Footer from "./footer";
import data from "../data/data";

export class Home extends Component {
  state = {
    resumeData: {},
  };
  componentDidMount() {
    this.setState({ resumeData: data });
  }

  render() {
    return (
      <div style={{msOverflowY: "visible"}}>
        <Whatsapp />
        <Navigation />
        <Header data={this.state.resumeData.Header} />
        <About />
        <Features data={this.state.resumeData.Features} /> 
        {/* <Gallery /> <br /><br /><br /><br /><br />  */}
        <Contact />
        {/* <Testimonials data={this.state.resumeData.Testimonials} />  */}
        <Footer />
      </div>
    );
  }
}

export default Home;
