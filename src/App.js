import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./views/Login/Login";
import { Link } from "react-router-dom";
import Formulario from "./views/Formulario/Formulario";

function App() {
  return (
    <>

      <Router>
        <div>
          <Switch>

            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/Login">
              <Login />
            </Route>

            <Route path="/Formulario">
              <Formulario />
            </Route>
            
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
