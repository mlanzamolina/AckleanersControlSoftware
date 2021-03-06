import React, { useEffect, useState, memo, Component } from "react";
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
} from "../../components/firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";

import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Table.module.css";
import useTable from "./useTable";
import TableFooter from "./TableFooter";

const EliminarEmpleados = ({ rowsPerPage }) => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [mostrarE, setMostrarE] = useState(false);
  const [opcionE, setopcionE] = useState(false);
  const [id, setID] = useState("");
  const [mostrarM, SetmostrarM] = useState(false);
  const [currentID, setCurrentID] = useState({
    id: null,
    nombre: "",
    dni: "",
    correo: "",
    telefono: "",
    estado: "",
    foto: "",
    direccion: "",
  });
  const [currentID2, setCurrentID2] = useState({
    id: null,
    nombre: "",
    dni: "",
    correo: "",
    telefono: "",
    estado: "",
    foto: "",
    direccion: "",
  });

  const [mostrarV, setMostrarV] = useState(false);

  const [paginated, setPaginated] = useState();

  const [page, setPage] = useState(1);
  const [vista, setVista] = useState({
    id: null,
    nombre: "",
    dni: "",
    correo: "",
    telefono: "",
    estado: "",
    foto: "",
    direccion: "",
  });

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [dni, setDNI] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState("");
  const [foto, setFoto] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dni_unico, setDni_unico] = useState(false);

  const [image, setImage] = useState("");
  const [imageurl, setimageURL] = useState("");
  const [idFire, setIDFire] = useState("");
  const [q, setQ] = useState("");
  const [imageurl2, setimageURL2] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const getEmpleados = async () => {
    const temp = [];
    db.collection("Empleados").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });

      setData(temp);
    });
  };

  useEffect(() => {
    const fecthData = async () => {
      db.collection("Empleados").onSnapshot(function (data) {
        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    fecthData();
    if (loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  const { slice, range } = useTable(data, page, 5);

  const refrescar = () => {
    window.location.reload(false);
  };

  const eliminarEmpleado = async (id) => {
    const empleado = doc(db, "Empleados", id);

    deleteDoc(empleado);
    mostrarModalEliminar();

    getEmpleados();
  };

  const mostrarModalEliminar = (index) => {
    setID(index);

    if (mostrarE === false) {
      setMostrarE(!mostrarE);
    } else {
      setMostrarE(!mostrarE);
    }
  };

  const handleFileSubmit = (e) => {
    if (
      !(
        e.target.files[0].name.toLowerCase().endsWith(".png") ||
        e.target.files[0].name.toLowerCase().endsWith(".jpg")
      )
    ) {
      swal({
        title: "Formato de archivo no aceptable",
        text: "El archivo subido no es una foto, por favor asegurarse de subir una imagen formato png o jpeg",
        icon: "warning",
        button: "Aceptar",
      });
      e.target.value = null;
      setimageURL(null);
      setImage(null);
      return;
    }
    setimageURL(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleInputChance = (event) => {
    setCurrentID2({
      ...currentID2,
      [event.target.name]: event.target.value,
    });
  };

  const handleDni = (e) => {
    try {
      setDni_unico(true);
      data.map((item) => {
        if (item.dni === e.target.value && item.dni !== currentID.id) {
          setDni_unico(false);
          swal({
            title: "Numero de Documento Nacional de Identifacicion repetido",
            text: "Por favor reingrese un DNI unico o no se le dejara modificar",
            icon: "warning",
            button: "Aceptar",
          });
        }
      });
    } catch (error) {
      console.log("Error DNI");
    }
  };

  const obtener = (empleados) => {
    try {
      setIDFire(empleados.id);

      setCurrentID({
        id: empleados.dni,
        nombre: empleados.nombre,
        correo: empleados.correo,
        telefono: empleados.n_telefono,
        foto: empleados.foto,
        estado: empleados.estado,
        direccion: empleados.direccion,
      });
    } catch (error) {}
  };

  const editRow = (empleados) => {
    obtener(empleados);

    if (mostrarM === false) {
      SetmostrarM(!mostrarM);
    } else {
      SetmostrarM(!mostrarM);
    }

    if (empleados.foto) {
      setimageURL(empleados.foto);
    } else {
      setimageURL("");
    }
  };

  /*const obtener2 = ()=>{

        setCurrentID2({dni: dni, nombre: nombre,correo: correo, 
            telefono: telefono, 
            foto: foto, estado: estado, 
            direccion: direccion});
            
    }*/

  const modificar = async (e) => {
    e.preventDefault();

    const empleadosDoc = doc(db, "Empleados", idFire);

    var nombre2 = document.getElementById("nombre").value;
    var id2 = document.getElementById("id").value;
    var telefono2 = document.getElementById("telefono").value;
    var correo2 = document.getElementById("correo").value;
    var direccion2 = document.getElementById("direccion").value;
    var estado2 = document.getElementById("estado").value;

    console.log(id2);

    if (
      nombre2 == " " ||
      telefono2 == " " ||
      id2 == " " ||
      correo2 == " " ||
      imageurl === " "
    ) {
      swal({
        title: "No se realizo",
        text: "No se modifico el empleado, verifique los campos",
        icon: "warning",
        button: "Aceptar",
      });
    } else {
      setIsloading(true);
      await updateDoc(empleadosDoc, {
        nombre: nombre2,
        dni: id2,
        correo: correo2,
        n_telefono: telefono2,
        estado: estado2,
        direccion: direccion2,
      }).catch((error) => {
        swal({
          title: "Surgio un error",
          text: "No se modifico",
          icon: "info",
          button: "Aceptar",
        });
      });
      console.log(nombre);
      //await new Promise(resolve=> setTimeout(resolve, 2000));

      const uploadtask = almacenamiento
        .ref("/UsuarioFotos/" + idFire)
        .put(image);
      uploadtask
        .then((uploadtaskSnapshot) => {
          return uploadtaskSnapshot.ref.getDownloadURL();
        })
        .then((url) => {
          updateDoc(doc(db, "Empleados", idFire), {
            foto: url,
          });
          setIsloading(false);
        });

      swal({
        title: "Empleado Modificado",
        text: "Se modifico el empleado exitosamente",
        icon: "info",
        button: "Aceptar",
      });
    }
  }; //Fin

  const cambiarFoto = (e) => {
    e.target.src = imageurl;
  };

  const mostrarVistaEmpleado = (empleados) => {
    setVista({
      nombre: empleados.nombre,
      telefono: empleados.n_telefono,
      dni: empleados.dni,
      correo: empleados.correo,
      id: empleados.id,
      foto: empleados.foto,
      direccion: empleados.direccion,
      estado: empleados.estado,
    });

    if (mostrarV == false) {
      setMostrarV(!mostrarV);
    } else {
      setMostrarV(!mostrarV);
    }
  };

  return (
    <>
      <Nav />
      <div className="contentf">
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "1%",
            marginBottom: "80px",
            borderBottom: "2px solid black",
          }}
        >
          Administraci??n de Empleados
        </h1>
        <div className="container">
          <div className="mt-4 mb-4 table-responsive">
            <table className="table table-dark table-striped">
              <thead className={styles.tableRowHeader}>
                <tr className="text-center">
                  <th scope="col">NOMBRE</th>
                  <th scope="col">DNI</th>
                  <th scope="col">TELEFONO</th>
                  <th scope="col">CORREO</th>
                  <th scope="col">ESTADO</th>
                  <th scope="col">DIRECCION</th>
                  <th scope="col">EDITAR</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((empleados, index) => (
                  <tr key={index}>
                    <td class="table-primary">{empleados.nombre}</td>
                    <td class="table-primary">{empleados.dni}</td>
                    <td class="table-primary">{empleados.n_telefono}</td>
                    <td class="table-primary">{empleados.correo}</td>
                    <td class="table-primary">{empleados.estado}</td>
                    <td class="table-primary">{empleados.direccion}</td>

                    <td class="table-primary">
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <Button
                          color="success"
                          onClick={() => editRow(empleados)}
                        >
                          <i class="bi bi-pencil"></i>
                        </Button>
                        <Button
                          color="success"
                          onClick={() => setMostrarE(true)}
                          onClick={() => mostrarModalEliminar(empleados.id)}
                        >
                          <i class="bi bi-person-x"></i>
                        </Button>

                        <Button
                          color="success"
                          onClick={() => mostrarVistaEmpleado(empleados)}
                        >
                          <i class="bi bi-person-video"></i>
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
          <Link to="/AgregarEmpleado">
            <button
              type="button"
              class="btn btn-success"
              style={{ marginLeft: "75%" }}
            >
              Ir a Agregar Empleado
            </button>
          </Link>
          <Link to="/interfazEmpleados">
            <button
              type="button"
              class="btn btn-danger"
              style={{ marginLeft: "1%" }}
            >
              Volver
            </button>
          </Link>
        </div>
        <Modal isOpen={mostrarE}>
          <ModalHeader closeButton>??DESEA ELIMINAR EL EMPLEADO?</ModalHeader>

          <ModalFooter>
            <Button
              type="button"
              variant="primary"
              onClick={() => eliminarEmpleado(id)}
              style={{ background: "red" }}
            >
              SI
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => mostrarModalEliminar()}
              style={{ background: "rgb(70,130,180)" }}
            >
              NO
            </Button>
          </ModalFooter>
        </Modal>

        {/* MODAL PARA MOSTRAR OBJETOS */}

        <Modal isOpen={mostrarM}>
          <ModalHeader>Modificar Empleado</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <form onSubmit={(e) => modificar(e)}>
                <label>Nombre: </label>
                <br />
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  onChange={(e) => setNombre(e.target.value)}
                  defaultValue={currentID && currentID.nombre}
                  name="nombre"
                />
                <br />
                <label>DNI: </label>
                <br />
                <input
                  type="text"
                  id="id"
                  className="form-control"
                  //onBlur={handleDni}
                  onChange={(e) => setDNI(e.target.value)}
                  defaultValue={currentID && currentID.id}
                  pattern="[0-9]{13}"
                  title="numero 13 digitos sin nada extra"
                />
                <br />
                <label>Correo: </label>
                <br />
                <input
                  type="text"
                  id="correo"
                  className="form-control"
                  onChange={(e) => setCorreo(e.target.value)}
                  defaultValue={currentID && currentID.correo}
                  name="correo"
                />
                <br />
                <label>Telefono </label>
                <br />
                <input
                  type="text"
                  id="telefono"
                  className="form-control"
                  onChange={(e) => setTelefono(e.target.value)}
                  pattern="[0-9]{8}"
                  title="numero 8 digitos sin nada extra"
                  defaultValue={currentID && currentID.telefono}
                  name="telefono"
                />
                <br />
                <label>Direccion</label>
                <br />
                <textarea
                  id="direccion"
                  class="form-control"
                  name="direccion"
                  placeholder="Direccion donde reside el empleado"
                  onChange={(e) => setDireccion(e.target.value)}
                  defaultValue={currentID && currentID.direccion}
                ></textarea>
                <label>Estado Empleado</label>
                <br />
                <select
                  id="estado"
                  onChange={(e) => setEstado(e.target.value)}
                  defaultValue={currentID && currentID.estado}
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>

                <label> Foto Empleado </label>
                <br />

                <div>
                  <img id="foto" src={imageurl} class="form-control" />
                </div>

                <div class="form-control">
                  <input
                    id="b_file"
                    type="file"
                    class="form-control-file"
                    accept=".jpg,.png"
                    onChange={handleFileSubmit}
                  />
                </div>

                <ModalFooter>
                  <Button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={() => SetmostrarM(false)}
                    style={{ background: "red" }}
                  >
                    Salir
                  </Button>
                  <Button
                    type="submit"
                    class="btn btn-outline-danger"
                    style={{ background: "rgb(70,130,180)" }}
                  >
                    {isLoading ? (
                      <h1 class="btn btn-primary" type="button" disabled>
                        <span
                          class="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span class="sr-only">Loading...</span>
                      </h1>
                    ) : (
                      <h1>Modificar</h1>
                    )}
                  </Button>
                </ModalFooter>
              </form>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={mostrarV}>
          <ModalHeader>{vista.nombre}</ModalHeader>
          <ModalBody>
            <img src={vista.foto} class="card-img-top" alt="..."></img>
            <div class="container">
              <div class="col">
                <label>
                  <strong>ID:</strong>
                </label>
                <label>&nbsp;&nbsp;{vista.dni}</label>
              </div>
              <div class="col">
                <label>
                  <strong>Correo:</strong>
                </label>
                <label>&nbsp;&nbsp;{vista.correo}</label>
              </div>
              <div class="col">
                <label>
                  {" "}
                  <strong>Telefono:</strong>
                </label>
                <label>&nbsp;&nbsp;{vista.telefono}</label>
              </div>

              <div class="col align-self-start">
                <label>
                  <strong>Direccion:</strong>
                </label>
                <label>&nbsp;&nbsp;{vista.direccion}</label>
              </div>
            </div>

            <ModalFooter>
              <Button
                type="button"
                class="btn btn-outline-danger"
                onClick={() => setMostrarV(false)}
                style={{ background: "red" }}
              >
                Salir
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default EliminarEmpleados;
