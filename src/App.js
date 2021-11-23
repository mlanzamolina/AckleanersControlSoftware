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
import Usuarios from "./views/Usuarios/Usuarios";
import Ordenes from "./views/Orders/Ordenes";
import ListarOrdenes from "./views/Orders/ListarOrdenes";
import AgregarOrden from "./views/Orders/agregarOrden";
import Reportes from "./views/Reports/Reportes";
import ModificarOrden from "./views/Orders/modificarOrdenes";
import AgregarReportes from "./views/Reports/AgregarReportes";
import ModificarUsuarios from "./views/Usuarios/ModificarUsuario";
import ListarUsuarios from "./views/Usuarios/ListarUsuarios";
import AgregarUsuarios from "./views/Usuarios/AgregarUsuarios";
import Inventarios from "./views/Inventarios/Inventarios";
import NewPassword from "./views/NewPassword/NewPassword"

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

            <Route path="/Reportes">
              <Reportes />
            </Route>

           
            <Route path="/AgregarReportes/:id">
              <AgregarReportes />
            </Route>

            <Route path="/ModificarOrden">
              <ModificarOrden />
            </Route>

            <Route path="/ListarUsuarios">
              <ListarUsuarios />
            </Route>

            <Route path="/ModificarUsuarios">
              <ModificarUsuarios />
            </Route>
            <Route path="/AgregarUsuarios">
              <AgregarUsuarios />
            </Route>
            <Route path="/inventarios">
              <Inventarios />
            </Route>
            <Route path="/NewPassword">
              <NewPassword />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
