import React from "react";
import { useEffect, useState } from "react";
import "./estiloCuadrillas.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../components/firebase";
import { Link } from "react-router-dom";
import Nav from "../NavAdmin";
import { useCollectionData } from "react-firebase-hooks/firestore";
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
import swal from "sweetalert";
import useTable from "./useTable";
import TableFooter from "./TableFooter";
import styles from "./Table.module.css";
let hoy = new Date();
let fechaActual =
  hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();

export const ModificarCuadrilla = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, 5);
  const [mostrarM, SetmostrarM] = useState(false);
  const [emp, setEmpleados] = useState([]);
  const [valueEmpleado, setValueEmpleado] = useState([]);
  const [valueHerramienta, setValueHerramienta] = useState([]);
  const [id, setID] = useState("");
  const [nombre, setNombre] = useState("");
  const [currentID, setCurrentID] = useState({
    id: null,
    nombreCuadrilla: "",
    herramientasCuadrillas: "",
    empleadosCuadrilla: "",
    fechaCreacion: "",
    comentarioCuadrilla: "",
  });
  const [comentario, setComentario] = useState("");

  const editRow = (cuadrillas, index) => {
    obtener(cuadrillas);
    console.log(cuadrillas.nombreCuadrilla);

    if (mostrarM === false) {
      SetmostrarM(!mostrarM);
    } else {
      SetmostrarM(!mostrarM);
    }
  };

  const obtener = (cuadrillas) => {
    setID(cuadrillas.id);
    setCurrentID({
      id: cuadrillas.id,
      nombreCuadrilla: cuadrillas.nombreCuadrilla,
      comentarioCuadrilla: cuadrillas.comentarioCuadrilla,
      fechaCreacion: cuadrillas.fechaCreacion,
      herramientasCuadrillas: cuadrillas.herramientasCuadrillas,
    });
  };

  const [empleados, emp_loading, emp_error] = useCollectionData(
    collection(db, "Empleados"),
    { idField: "id" }
  );

  const [inventario, inv_loading, inv_error] = useCollectionData(
    collection(db, "Inventario"),
    { idField: "id" }
  );

  function addEmpleado(e) {
    e.preventDefault();
    var getElementoEmpleado = document.getElementById("id_empleados").value;

    if (getElementoEmpleado === "Seleccione empleado (s)") {
      swal({
        title: "Error",
        text: "Ingrese un empleado valido para añadir a la cuadrilla.",
        icon: "info",
        button: "Aceptar",
      });
      return;
    } else if (valueEmpleado.includes(getElementoEmpleado)) {
      swal({
        title: "Error",
        text: "El empleado ya ha sido agregado a la cuadrilla.",
        icon: "info",
        button: "Aceptar",
      });
      return;
    } else {
      setValueEmpleado([...valueEmpleado, getElementoEmpleado]);
    }
  }

  function addHerramienta(e) {
    e.preventDefault();
    var getElementoHerramienta =
      document.getElementById("i_herramientas").value;
    if (getElementoHerramienta === "Seleccione herramienta (s)") {
      swal({
        title: "Error",
        text: "Ingrese una herramienta valida para añadir a la cuadrilla.",
        icon: "info",
        button: "Aceptar",
      });
      return 0;
    } else if (valueHerramienta.includes(getElementoHerramienta)) {
      swal({
        title: "Error",
        text: "Herramienta ya ha sido asignada a la cuadrilla.",
        icon: "info",
        button: "Aceptar",
      });
      return;
    }
    setValueHerramienta([...valueHerramienta, getElementoHerramienta]);
  }

  const cargarDatos = async (event) => {
    event.preventDefault();
    const idCuadrilla = event.target.nombreCuadrilla.value;
    if (!idCuadrilla) {
      swal({
        title: "No se realizo",
        text: "Coloque un nombre/identificador para la cuadrilla",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    if (valueEmpleado.length === 0) {
      swal({
        title: "No se realizo",
        text: "Coloque al menos un empleado en la cuadrilla",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    if (valueHerramienta.length === 0) {
      swal({
        title: "No se realizo",
        text: "Coloque al menos una herramienta en la cuadrilla",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    const descripCuadrilla = event.target.descripcionCuadrilla.value;
    if (!descripCuadrilla) {
      swal({
        title: "No se realizo",
        text: "Coloque al menos un comentario que sirva para la cuadrilla",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }
    const fechaCuadrilla = fechaActual;
    const tablaDocumentosRef = doc(db, "Cuadrillas", id);

    var nombre2 = document.getElementById("i_nombre").value;
    var descripcion2 = document.getElementById("i_descripcion").value;

    if (nombre2 == " " || descripcion2 == " ") {
      swal({
        title: "No se realizo",
        text: "No se modifico la cuadrilla, verifique los campos",
        icon: "warning",
        button: "Aceptar",
      });

      return;
    } else {
      await updateDoc(tablaDocumentosRef, {
        nombreCuadrilla: nombre2,
        comentarioCuadrilla: descripcion2,
        herramientasCuadrillas: valueHerramienta,
        empleadosCuadrilla: valueEmpleado,
        fechaCreacion: fechaActual,
      }).catch((error) => {
        swal({
          title: "Surgio un error",
          text: "No se modifico",
          icon: "info",
          button: "Aceptar",
        });
      });

      swal({
        title: "Cuadrilla Modificada",
        text: "Se modifico el documento exitosamente",
        icon: "info",
        button: "Aceptar",
      });
    }

    document.getElementById("i_nombre").value = null;
    document.getElementById("id_empleados").value = "Seleccione empleado (s)";
    document.getElementById("i_herramientas").value = "Seleccione herramienta (s)";
    document.getElementById("i_descripcion").value = null;
    setValueEmpleado([]);
    setValueHerramienta([]);
    return;
  };

  useEffect(() => {
    const fecthData = async () => {
      db.collection("Cuadrillas").onSnapshot(function (data) {
        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    fecthData();

    if (loading) return;
    if (user === null) window.location.assign("/Login");
  }, [user, loading]);

  return (
    <>
      <Nav />
      <div className="contentf">
        <div className="text-center" style={{ margin: "50px 0px" }}>
          <h1 style={{
            width: "100%",
            textAlign: "center",
            marginTop: "1%",
            marginBottom: "80px",
            borderBottom: "2px solid black",
            fontSize: "30px"
          }}
          >Administración de Cuadrillas</h1>
        </div>
        <div className="mt-4 mb-4 table-responsive">
          <table className="table table-dark table-striped">
            <thead className={styles.tableRowHeader}>
              <tr className="align-me">
                <th scope="col">Nombre Cuadrilla</th>
                <th scope="col">Empleados Cuadrilla</th>
                <th scope="col">Herramientas</th>
                <th scope="col">Fecha</th>
                <th scope="col">Comentario</th>
                <th scope="col">EDITAR</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((cuadrilla, index) => (
                <tr key={index}>
                  <td class="table-primary">{cuadrilla.nombreCuadrilla}</td>

                  <td class="table-primary">
                    {cuadrilla.empleadosCuadrilla + ""}{" "}
                  </td>
                  <td class="table-primary">
                    {cuadrilla.herramientasCuadrillas + ""}
                  </td>
                  <td class="table-primary">{cuadrilla.fechaCreacion}</td>
                  <td class="table-primary">{cuadrilla.comentarioCuadrilla}</td>

                  <td class="table-primary">
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Button
                        color="success"
                        onClick={() => editRow(cuadrilla, index)}
                      >
                        <i class="bi bi-pencil"></i>
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

        <Modal isOpen={mostrarM}>
          <ModalHeader>CUADRILLA</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <form onSubmit={cargarDatos}>
                <label>Identificador de Cuadrilla</label>

                <input
                  type="text"
                  id="i_nombre"
                  className="form-control"
                  onChange={(e) => setNombre(e.target.value)}
                  defaultValue={currentID && currentID.nombreCuadrilla}
                  name="nombreCuadrilla"
                />
                <br />

                <select
                  type="text"
                  class="form-control rounded"
                  id="id_empleados"
                  placeholder="Ingrese empleados disponibles"
                  name="empleadosCuadrilla"
                >
                  <option selected>Seleccione empleado (s)</option>
                  {empleados
                    ? empleados.map((item) => {
                      return (
                        <option key={item.id} value={item.nombre}>
                          {"[ID Empleado: " +
                            item.id +
                            "]" +
                            " [Nombre:" +
                            item.nombre +
                            "]"}
                        </option>
                      );
                    })
                    : null}
                </select>

                <div className="mb-3 col-md-8 rounded estiloAgregados letrasAgregados2">
                  <label style={{ marginLeft: "1%" }}>
                    Empleado(s) asignados:
                  </label>
                  {valueEmpleado.map((name) => (
                    <h2 class="indentadoAgregados">{name}</h2>
                  ))}
                </div>
                <button
                  class="mb-3 col-md-8 btn btn-success"
                  onClick={addEmpleado}
                >
                  Agregar
                </button>

                <div class="mb-3 col-md-8">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label letrasFormulario"
                  >
                    Seleccione Herramienta (s) Para la Cuadrilla
                  </label>
                  <select
                    className="form-control"
                    id="i_herramientas"
                    style={{ resize: "none" }}
                    name="herramientasCuadrilla"
                  >
                    <option selected>Seleccione herramienta (s)</option>
                    {inventario
                      ? inventario.map((item) => {
                        return (
                          <option key={item.id} value={item.nombre}>
                            {"[Nombre: " +
                              item.nombre +
                              "]" +
                              "[Descripcion: " +
                              item.descripcion +
                              "]"}
                          </option>
                        );
                      })
                      : null}
                  </select>
                  <div className="mb-3 col-md-6 rounded estiloAgregados letrasAgregados2">
                    <label style={{ marginLeft: "1%" }}>
                      Herramienta (s) asignadas:
                    </label>
                    {valueHerramienta.map((name) => (
                      <h2 class="indentadoAgregados">{name}</h2>
                    ))}
                  </div>
                  <button
                    class=" mb-3 col-md-6 btn btn-success"
                    onClick={addHerramienta}
                  >
                    Agregar
                  </button>
                </div>

                <label>Comentario Cuadrilla</label>

                <textarea
                  id="i_descripcion"
                  class="form-control"
                  name="descripcionCuadrilla"
                  onChange={(e) => setComentario(e.target.value)}
                  defaultValue={currentID && currentID.comentarioCuadrilla}
                ></textarea>
                <br />

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
                    Editar Cuadrilla
                  </Button>
                </ModalFooter>
              </form>
            </div>
          </ModalBody>
        </Modal>

        <div class="col-12 offset-lg-8">
          <Link to="/agregarCuadrilla">
            <button
              type="submit"
              class="btn btn-success"
              style={{ marginBottom: "5%", marginTop: "2%" }}
            >
              Agregar Nueva Cuadrilla
            </button>
          </Link>

          <Link to="/interfazCuadrillas">
            <button
              type="submit"
              class="btn btn-danger"
              style={{ marginLeft: "2%", marginBottom: "5%", marginTop: "2%" }}
            >
              Volver
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ModificarCuadrilla;
