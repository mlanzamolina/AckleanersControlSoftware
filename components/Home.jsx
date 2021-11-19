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
        <div className="cover">
          <h1>Home</h1>
        </div>
        <Navigation />
        <Header data={this.state.resumeData.Header} />
        <Features data={this.state.resumeData.Features} />
        <About data={this.state.resumeData.About} />
        <Gallery />
        <Testimonials data={this.state.resumeData.Testimonials} />
        <Contact data={this.state.resumeData.Contact} />
        <Whatsapp />
        <a href="/"><img src={logo} alt="logo ackleaners" width="250" style={{
              margin: 0,
              top: "auto",
              left: 45,
              bottom: -99,
              position: "fixed",
            }}/></a> 
      </div>
    );
  }
}

export default Home;
