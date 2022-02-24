import React, { useState, useEffect, Fragment } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import "./Management.css";
import logo from "../../img/logo.png";
import Nav from "../NavAdmin";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, Firestore, updateDoc } from "firebase/firestore";
import { dbOrdenes, db } from "../../components/firebase";
import styles from "./Table.module.css";



function SideMenu() {
  const [dats, setDatos] = useState({
    nombre: " ",
    numero_telefono: " ",
    cantidad_unidades: " ",
    descripcion: " ",
    proxima_revision: " ",
  });

  const handleInputChance = (event) => {
    console.log(event.target.value);
    setDatos({
      ...dats,
      [event.target.name]: event.target.value,
    });
  };

  const [clientes] = useCollectionData(
    collection(db, "OrdenesTrabajo"),
    { idField: "id" }
  );
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);
  const [userName, setUserName] = useState("");

  const showSidebar = () => setSidebar(!sidebar);
  const [fechaactual, setfechaactual] = useState([]);

  useEffect(() => {
    var date = new Date();
    date.setDate(date.getDate());
    setfechaactual(date);
    if (loading) return;
    if (user === null) window.location.assign("/Login");
    setUserName(user.email);
  }, [user, loading]);

  return (
    <>
      <Nav />
      <Fragment>
        <div class="contentf">
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "1%",
              marginBottom: "30px",
              borderBottom: "2px solid black",
            }}
          >
            Hola, {userName}{" "}
          </h1>
          <h2
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "1%",
            borderBottom: "2px solid black",
            fontSize:"25px"
          }}>
            Resumen de Servicios Pendientes</h2>
          <table className="table table-dark table-striped" align="center">
            {/*<table className="ta" align="center">*/}
            <thead className={styles.tableRowHeader}>
              <tr className="text-center">
                {/*<tr className="ta">*/}

                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Tipo de Servicio</th>
                <th scope="col">Proxima Revision</th>
              </tr>
            </thead>
            <tbody>
              {clientes
                ? clientes.map((item, index) => {
                    if (item.proxima_revision !== "") {
                      //fecha dividir en un arreglo pos 0=dia pos 1=mes pos 2=año
                      const fechArr = item.proxima_revision.split("/");
                      //fecha actual dividir en un arreglo pos 0=dia pos 1=mes pos 2=año
                      var pDate = new Date(
                        fechArr[2],
                        fechArr[1] - 1,
                        fechArr[0]
                      );
                      //probando formato de fecha
                      //console.log(pDate.getDate() + "/" + (pDate.getMonth() + 1) + "/" + pDate.getFullYear());
                      //fecha actual igual a 7 dias o menos de la proxima revision
                      pDate = new Date(
                        pDate.getFullYear(),
                        pDate.getMonth(),
                        pDate.getDate() - 7
                      );
                      //enviar recordatorio aqui
                      if (fechaactual.getTime() >= pDate.getTime()) {
                        contador = contador + 1;
                        return (
                          <tr key={item.id} className="text-center">
                            <td className="table-primary">{item.nombre}</td>                            
                            <td className="table-primary">
                              {item.numero_telefono}
                            </td>
                            <td className="table-primary">
                              {item.tipo_vivienda}
                            </td>
                            <td className="table-primary">
                              {item.proxima_revision}
                            </td>
                          </tr>
                        );
                      }
                    }
                  })
                : null}
            </tbody>
          </table>
          <Link to="/adminOrders"></Link>
        </div>
      </Fragment>
    </>
  );
}

export default SideMenu;
