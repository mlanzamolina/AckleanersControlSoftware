import React, { useState, useEffect} from "react";
import {auth} from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import "./Management.css";
import logo from "../../img/logo.png";
<<<<<<< Updated upstream
import Nav from "../NavAdmin"

=======
import Nav from "../NavAdmin";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, Firestore, updateDoc } from "firebase/firestore";
import { dbOrdenes, db } from "../../components/firebase";
import styles from "./Table.module.css";
import * as emailjs from "emailjs-com";
import swal from "sweetalert";
>>>>>>> Stashed changes

function SideMenu() {
  const [user, loading, error] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    console.log(user);
    if(loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  
  async function handleSend() {
    var template_params = {
      to_name: "Clientes prontos a limpieza",
      from_name: "Sistema de Reportes",
      message: clientes.,
    };
    console.log(template_params);

    emailjs
      .send(
        "service_07irwdr",
        "template_0n3zehl",
        template_params,
        emailjs.init("user_swdEcicIxbn0pfLvSx9HE")
      )
      .then(
        swal({
          title: "¡Enviado!",
          text: "Se envio un correo de confirmación",
          icon: "info",
          button: "Aceptar",
        })
      );
  }

  return (
    <>
<<<<<<< Updated upstream
   
    <Nav />
   
<div class="sidebar" >
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>

<div class="contentf">
<h3>Bienvenido ,Nombre de persona, al hub de herramientas administrativas hoy es , fecha de hoy, lista de clientes que tienen pendiente limpieza por fecha</h3> 
</div>
=======
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

          <button className="rounded botonSize sendMail" onClick={handleSend} >
                      Enviar Lista
          </button>

        </div>
      </Fragment>
>>>>>>> Stashed changes
    </>
  );
}

export default SideMenu;