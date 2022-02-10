import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./index.css";
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
import { Empleados } from "./views/Employees/interfazEmpleados";
import AgregarOrden from "./views/Orders/agregarOrden";
import { Reportes } from "./views/Reports/interfazReportes";
import CrearReportes from "./views/Reports/Reportes";
import ModificarOrden from "./views/Orders/modificarOrdenes";
import AgregarReportes from "./views/Reports/AgregarReportes";
import ModificarUsuarios from "./views/Usuarios/ModificarUsuario";
import ListarUsuarios from "./views/Usuarios/ListarUsuarios";
import AgregarUsuarios from "./views/Usuarios/AgregarUsuarios";
import Inventarios from "./views/Inventarios/Inventarios";
import NewPassword from "./views/NewPassword/NewPassword";
import Probar from "./views/Probandocss/probar";
import { Documentos } from "./views/Documents/interfazDocumentos";
import EliminarEmpleados from "./views/Employees/eliminarEmpleados";
import AgregarDocumento from "./views/Documents/agregarDocumento";
import DescargarDocumento from "./views/Documents/descargarDocumento";
import "./components/tailwind.css";
import AdmiDocumentos from "./views/Documents/admiDocumentos";
import DeleteInventarios from "./views/Inventarios/deleteInventarios";
import AgregarInventarios from "./views/Inventarios/agregarInventarios";
import { IOrdenes } from "./views/Orders/interfazOrdenes";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <div className="cover">
            <Route path="/Login">
              <Login />
            </Route>

            <Route path="/probar">
              <Probar />
            </Route>

            <Route exact path="/interfazEmpleados">
              <Empleados />
            </Route>

            <Route exact path="/AgregarEmpleado">
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

            <Route path="/CrearReportes">
              <CrearReportes />
            </Route>

            <Route path="/AgregarReportes/:id/:nombre/:telefono">
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
            <Route path="/adminDocs">
              <Documentos />
            </Route>
            <Route path="/eliminarEmpleados">
              <EliminarEmpleados />
            </Route>

            <Route path="/agregarDocumento">
              <AgregarDocumento />
            </Route>

            <Route path="/descargarDocumento">
              <DescargarDocumento />
            </Route>
            <Route path="/admiDocumentos">
              <AdmiDocumentos />
            </Route>
            <Route path="/DeleteInventarios">
              <DeleteInventarios />
            </Route>
            <Route path="/agregarInventarios">
              <AgregarInventarios />
            </Route>

            <Route path="/adminOrders">
              <IOrdenes />
            </Route>
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
