import React, { useEffect, useState } from "react";
import Nav from "../NavAdmin";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import {
  db,
  auth,
  registerWithEmailAndPassword,
  almacenamiento,
  app,
} from "../../components/firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Table.module.css";
import useTable from "./useTable";
import TableFooter from "./TableFooter";
import NavAdmin from "../NavAdmin";

const AdmiDocumentos = () => {
  const [data, setData] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [page, setPage] = useState(1);
  const [tipo, setTipo] = useState("");
  const [mostrarE, setMostrarE, setMostrarEliminar] = useState(false);
  const [idFire, setIDFire] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipoD, setTipoD] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idDoc, setIDDoc] = useState("");
  const [url2, setURL2] = useState("");
  let hoy = new Date();
  let fechaActual =
    hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
  const [currentID, setCurrentID] = useState({
    id: null,
    nombre: "",
    tipo: "",
    descripcion: "",
    url: "",
    fecha: "",
  });
  const [mostrarM, SetmostrarM] = useState(false);

  /*useEffect(() => {
      const fecthData = async ()=>{
        db.collection("Empleados").onSnapshot(function(data){
          setData(data.docs.map(doc=>({...doc.data(),id:doc.id})))
        })
      }
      fecthData();
    }, []);*/

  const getDocumentos2 = async () => {
    db.collection("Documentos").onSnapshot(function (data) {
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const elegirTipo = async () => {
    const temp = [];

    var opcion = tipo;

    const docEmpleados = db.collection("Documentos");
    const snapshot = await docEmpleados.where("tipo", "==", opcion).get();
    if (snapshot.empty) {
      alert("No hay resultados");

      return;
    } else {
      snapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setData(temp);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user === null) window.location.assign("/Login");
    const getDocumentos = async () => {
      const temp = [];
      var cad = "Eligir Opcion";

      if (tipo === cad || tipo === "") {
        getDocumentos2();
      } else {
        elegirTipo();
      }
    };
    getDocumentos();
  }, [user, loading, tipo]);

  const [archivoUrl, setArchivoUrl] = useState("");

  const archivoHandler = async (event) => {
    const archivo = event.target.files[0];
    swal({
      title: "??Convirtiendo!",
      icon: "warning",
      text: "Un momento...",
      timer: 5000,
      button: false,
    });
    const storageRef = app.storage().ref("Documentos");
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("Archivo cargado ", archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);
  };

  const eliminarDocumento = async (index, e) => {
    e.preventDefault();
    console.log(index);
    const documentos = doc(db, "Documentos", index);
    console.log(documentos);

    deleteDoc(documentos);

    swal({
      title: "Documento Eliminado",
      text: "Se elimino el documento exitosamente",
      icon: "info",
      button: "Aceptar",
    });
    setMostrarE(false);
  };

  const mostrarModalEliminar = (index) => {
    setIDFire(index);

    if (mostrarE === false) {
      setMostrarE(!mostrarE);
    } else {
      setMostrarE(!mostrarE);
    }
  };

  const editRow = (documentos) => {
    obtener(documentos);
    setURL2(documentos.url);
    console.log(url2);

    if (mostrarM === false) {
      SetmostrarM(!mostrarM);
    } else {
      SetmostrarM(!mostrarM);
    }
  };

  const obtener = (documentos) => {
    setIDDoc(documentos.id);

    setCurrentID({
      id: documentos.id,
      nombre: documentos.nombre,
      descripcion: documentos.descripcion,
      tipo: documentos.tipo,
      url: documentos.url,
      fecha: documentos.fecha,
    });
  };

  const modificar = async (e) => {
    e.preventDefault();
    const documento = doc(db, "Documentos", idDoc);

    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
    var tipoDocu = document.getElementById("tipo").value;
    const nombreArchivo = currentID.url;

    if (nombre == " " || descripcion == " " || tipoDocu == " " || url2 === "") {
      swal({
        title: "No se realizo",
        text: "No se modifico el documento, verifique los campos",
        icon: "warning",
        button: "Aceptar",
      });

      return;
    } else {
      await updateDoc(documento, {
        nombre: nombre,
        descripcion: descripcion,
        tipo: tipoDocu,
        url: archivoUrl,
        fecha: fechaActual,
      }).catch((error) => {
        swal({
          title: "Surgio un error",
          text: "No se modifico",
          icon: "info",
          button: "Aceptar",
        });
      });

      swal({
        title: "Documento Modificado",
        text: "Se modifico el documento exitosamente",
        icon: "info",
        button: "Aceptar",
      });
    }
  }; //Fin

  const handleChange = (e) => {
    setTipo(e.target.value);
  };

  const { slice, range } = useTable(data, page, 5);

  return (
    <>
      <NavAdmin></NavAdmin>
      <div className="contentf">
        <div className="text-center" style={{ margin: "50px 0px" }}>
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "1%",
              marginBottom: "80px",
              borderBottom: "2px solid black",
              fontSize: "30px",
            }}
          >
            Administraci??n de Documentos
          </h1>
        </div>
        <div className="container">
          <div className="dropdown">
            <label>
              <h5>BUSCAR</h5>
            </label>
            <br />
            <select onChange={(e) => handleChange(e)} id="tipo2">
              <option>Eligir Opcion</option>
              <option>Reporte</option>
              <option>Instructivo</option>
              <option>Procedimiento</option>
              <option>Manual</option>
              <option>Formato</option>
            </select>
          </div>

          <div className="mt-4 mb-4 table-responsive">
            <table className="table table-dark table-striped">
              <thead className={styles.tableRowHeader}>
                <tr className="align-me">
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">TIPO</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">EDITAR</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((documentos, index) => (
                  <tr key={index}>
                    <td class="table-primary">{documentos.nombre}</td>

                    <td class="table-primary">{documentos.descripcion}</td>
                    <td class="table-primary">{documentos.tipo}</td>
                    <td class="table-primary">{documentos.fecha}</td>

                    <td class="table-primary">
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <Button
                          onClick={() => editRow(documentos)}
                          color="success"
                        >
                          <i class="bi bi-pencil"></i>
                        </Button>
                        <Button
                          onClick={() => mostrarModalEliminar(documentos.id)}
                          color="success"
                        >
                          <i class="bi bi-archive"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TableFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
            />
          </div>
        </div>
        <Modal isOpen={mostrarE}>
          <ModalHeader closeButton>??DESEA ELIMINAR EL DOCUMENTO?</ModalHeader>

          <ModalFooter>
            <Button
              onClick={(e) => eliminarDocumento(idFire, e)}
              type="button"
              variant="primary"
              style={{ background: "red" }}
            >
              SI
            </Button>

            <Button
              onClick={() => setMostrarE(false)}
              type="button"
              variant="secondary"
              style={{ background: "rgb(70,130,180)" }}
            >
              NO
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={mostrarM}>
          <ModalHeader>Modificar Documento</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <form onSubmit={(e) => modificar(e)}>
                <label>Nombre: </label>

                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  onChange={(e) => setNombre(e.target.value)}
                  defaultValue={currentID && currentID.nombre}
                  name="nombre"
                />

                <br />
                <br />

                <label>Tipo Reporte:</label>
                <br />

                <select
                  id="tipo"
                  onChange={(e) => setTipoD(e.target.value)}
                  defaultValue={currentID && currentID.tipo}
                >
                  <option>Reporte</option>
                  <option>Instructivo</option>
                  <option>Procedimiento</option>
                  <option>Manual</option>
                  <option>Formato</option>
                </select>

                <br />
                <br />

                <label>Descripcion</label>

                <textarea
                  id="descripcion"
                  class="form-control"
                  name="descripcion"
                  onChange={(e) => setDescripcion(e.target.value)}
                  defaultValue={currentID && currentID.descripcion}
                ></textarea>
                <br />
                <br />

                <div class="offset-lg-1">
                  <input
                    id="i_foto"
                    type="file"
                    placeholder="Cargar documento..."
                    style={{ marginTop: "5%" }}
                    onChange={archivoHandler}
                  />
                  <br />
                </div>

                <br />

                <label>URL:</label>
                <br />

                <a
                  className="form-control"
                  target="_blank"
                  href={currentID.url}
                >
                  {" "}
                  Documento PDF
                </a>

                <ModalFooter>
                  <Button
                    type="button"
                    class="btn btn-outline-danger"
                    style={{ background: "red" }}
                    onClick={() => SetmostrarM(false)}
                  >
                    Salir
                  </Button>
                  <Button
                    type="submit"
                    class="btn btn-outline-danger"
                    style={{ background: "rgb(70,130,180)" }}
                  >
                    Modificar
                  </Button>
                </ModalFooter>
              </form>
            </div>
          </ModalBody>
        </Modal>

        <Link to="adminDocs">
          <button
            type="button"
            class="btn btn-danger"
            style={{ marginLeft: "75%", marginRight: "1%" }}
          >
            Volver
          </button>
        </Link>
        <Link to="AgregarDocumento">
          <button type="button" class="btn btn-secondary">
            Agregar Documento
          </button>
        </Link>
      </div>
    </>
  );
};

export default AdmiDocumentos;
