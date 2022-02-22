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

  const [empleados, loading2, error2] = useCollectionData(
    collection(db, "OrdenesTrabajo"),
    { idField: "id" }
  );
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);
  const [userName, setUserName] = useState("");

  const showSidebar = () => setSidebar(!sidebar);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
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
            Hola, {userName}
          </h1>
          <table className="table table-dark table-striped" align="center">
            {/*<table className="ta" align="center">*/}
            <thead className={styles.tableRowHeader}>
              <tr className="text-center">
                {/*<tr className="ta">*/}
                <th scope="col"># </th>
                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Proxima Revision</th>
              </tr>
            </thead>
            <tbody>
              {empleados
                ? empleados.map((item, index) => {
                    return (
                      <tr key={item.id} className="text-center">
                     
                        <td className="table-primary">{index + 1}</td>
                        <td className="table-primary">{item.nombre}</td>
                        <td className="table-primary">
                          {item.numero_telefono}
                        </td>
                        <td className="table-primary">
                          {item.proxima_revision}
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <Link to="/adminOrders">
          </Link>
        </div>
      </Fragment>
    </>
  );
}

export default SideMenu;
