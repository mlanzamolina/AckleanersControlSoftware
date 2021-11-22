import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./views/Login/Login";
import { Link } from "react-router-dom";
import AgregarEmpleado from "./views/Employees/agregarEmpleado";
import ModificarEmpleado from "./views/Employees/modificarEmpleado";
import ListarEmpleado from "./views/Employees/listarEmpleado";
import Management from "./views/Management/Management";
import PasswordRecovery from "./views/PasswordRecovery/PasswordRecovery";
import Registrar from "./views/Usuarios/Registrar";
import Usuarios from "./views/Usuarios/Usuarios";
import Ordenes from "./views/Orders/Ordenes";
import ListarOrdenes from "./views/Orders/ListarOrdenes";
import AgregarOrden from "./views/Orders/agregarOrden";
import CrearUsuario from "./views/Usuarios/CrearUsuario";
import Reportes from "./views/Reports/Reportes"
import ListarReportes from "./views/Reports/ListarReportes";



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
            <Route path="/AgregarEmpleado">
              <AgregarEmpleado />
            </Route>
            <Route exact path="/Management">
              <Management />
            </Route>
            <Route path="/PasswordRecovery">
              <PasswordRecovery />
            </Route>

            <Route path="/ModificarEmpleado">
              <ModificarEmpleado />
            </Route>

            <Route path="/ListarEmpleado">
              <ListarEmpleado />
            </Route>

            <Route path="/Registrar">
              <Registrar />
            </Route>
            <Route path="/Usuarios">
              <Usuarios />
            </Route>
            <Route path="/Ordenes">
              <Ordenes />
            </Route>
            <Route path="/ListarOrdenes">
              <ListarOrdenes />
            </Route>

            <Route path="/AgregarOrden">
              <AgregarOrden />
            </Route>

            <Route path="/CrearUsuario">
              <CrearUsuario />
            </Route>

            <Route path="/Reportes">
              <Reportes />
            </Route>

            <Route path="/ListarReportes">
              <ListarReportes />
            </Route>
            
            
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
