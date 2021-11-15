import React, { Component } from 'react'
import Navigation from './navigation';
import Header from './header';
import Features from './features';
import About from './about';
import Gallery from './gallery';
import Testimonials from './testimonials';
import Team from './Team';
import Contact from './contact';
import data from '../data/data';
import { Link } from 'react-router-dom';
export class Home extends Component {
 
  state = {
    resumeData : {},
    
  }
  componentDidMount(){
    this.setState({resumeData: data});
   
  }

  render() {
    return (
      
      <div>
         <div className="cover">
      <h1>Home</h1>
     
    </div>
        <Navigation />
        <Header data={this.state.resumeData.Header}/>
        <Features data={this.state.resumeData.Features}/>
        <About  data={this.state.resumeData.About}/>
        <Gallery />
        <Testimonials  data={this.state.resumeData.Testimonials}/>
        <Team  data={this.state.resumeData.Team}/>
        <Contact  data={this.state.resumeData.Contact}/>
       
      </div>
    )
  }
}

export default Home
