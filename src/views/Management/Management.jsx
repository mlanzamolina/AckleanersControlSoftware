import React, { useState, useEffect, Fragment } from "react";
import { auth } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import "./Management.css";
import Nav from "../NavAdmin";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, connectFirestoreEmulator, doc, Firestore, updateDoc } from "firebase/firestore";
import { dbOrdenes, db } from "../../components/firebase";
import styles from "./Table.module.css";
import * as emailjs from "emailjs-com";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { set } from "react-hook-form";
import swal from "sweetalert";


function SideMenu() {

  function removeDuplicates(arr) {
    return arr.filter((item,
      index) => arr.indexOf(item) === index);
  }

  function constructstring() {
    let cadena = "";
    setarrayClientes(removeDuplicates(arrayClientes));
      for (let index = 0; index < arrayClientes.length / 2; index++) {
      cadena += "[ Nombre: " + arrayClientes[index] + " Telefono: " + arrayClientestel[index] + " ]";
    }
    return cadena;
  }

  async function handleSend() {
    var template_params = {
      to_name: "Clientes prontos a limpieza",
      from_name: "Sistema de Reportes",
      message: constructstring(),
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
          text: "Correo electronico enviado con recordatorios pendientes",
          icon: "info",
          button: "Aceptar",
        })
      );
  }

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
  const [user, loading] = useAuthState(auth);
  const [arrayClientes, setarrayClientes] = useState([]);
  const [arrayClientestel, setarrayClientestel] = useState([]);
  const [userName, setUserName] = useState("");
  const [fechaactual, setfechaactual] = useState([]);
  const [ventanaConfirm, setVentanaConfirm] = useState(false);
  const [recordatorio, setRecordatorio] = useState(false);
  const [id, SetID] = useState("");



  const obtenerID = (id2) => {
    SetID(id2);
    console.log(id);
  }


  const modificarRecordatorio = async (e) => {
    e.preventDefault();
    console.log(id);
    const record = doc(db, "OrdenesTrabajo", id);

    await updateDoc(record, {
      recordad: recordatorio
    }).catch((error) => {
      swal({
        title: "Surgio un error",
        text: "No se modifico",
        icon: "info",
        button: "aceptar",
      });
    });

    swal({
      title: "Ordenes revisada",
      text: "Recordatorio confirmado",
      icon: "info",
      button: "aceptar",
    }).then
      (() => {
        setVentanaConfirm(false);
      
      }).then(() => {
        window.location.reload();
      });
  }

  const editRow = (id2) => {
    SetID(id2);
    setRecordatorio(true);
    console.log(id);
    if (ventanaConfirm === false) {
      setVentanaConfirm(!ventanaConfirm);
    } else {
      setVentanaConfirm(!ventanaConfirm);
    }
  };

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
              fontSize: "25px"
            }}>
            Resumen de Servicios Pendientes</h2>
            <div className="table-responsive">
          <table className="table table-dark table-striped" align="center">
            {/*<table className="ta" align="center">*/}
            <thead className={styles.tableRowHeader}>
              <tr className="text-center">
                {/*<tr className="ta">*/}

                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Tipo de Servicio</th>
                <th scope="col">Proxima Revision</th>
                <th scope="col">Confirmar Orden</th>
              </tr>
            </thead>
            <tbody>
              {clientes
                ? clientes.map((item, index) => {
                  if (item.proxima_revision !== "" && !item.recordad) {
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
                      arrayClientes.push(item.nombre);
                      arrayClientestel.push(item.numero_telefono);
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

                          <td class="table-primary">
                            <div
                              class="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <Button
                                onClick={() => editRow(item.id)}


                                color="success">
                                <i class="bi bi-card-checklist"></i>
                              </Button>

                            </div>
                          </td>



                        </tr>
                      );
                    }
                  }
                })
                : null}
            </tbody>
          </table>
          </div>
          <Modal isOpen={ventanaConfirm}>
            <ModalHeader closeButton>¿DESEA CONFIRMAR LA ORDEN DE TRABAJO?</ModalHeader>

            <ModalFooter>
              <Button
                onClick={(e) => modificarRecordatorio(e)}
                type="button"
                variant="primary"
                style={{ background: "red" }}
              >
                SI
              </Button>

              <Button
                onClick={() => setVentanaConfirm(false)}

                type="button"
                variant="secondary"
                style={{ background: "rgb(70,130,180)" }}
              >
                NO
              </Button>
            </ModalFooter>
          </Modal>

          <div className="col-12 offset-lg-4">
            <button
              type="submit"
              class="btn btn-success"
              style={{
                marginBottom: "5%",
                marginLeft:"4%",
                paddingLeft:"10%",
                paddingRight:"10%",
                marginTop: "1%",
                fontSize: "16px",
              }}
              onClick={handleSend}
            >
              Enviar Lista
            </button>
          </div>


          <Link to="/adminOrders"></Link>
        </div>
      </Fragment>


    </>
  );
}

export default SideMenu;
