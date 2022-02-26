import React, { useEffect, useState } from "react";
import Nav from "../NavAdmin";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,} from "reactstrap";
import { db, auth, registerWithEmailAndPassword, almacenamiento, app } from "../../components/firebase";
import { collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Table.module.css";
import useTable from "./useTable";
import TableFooter from "./TableFooter";
import NavAdmin from "../NavAdmin";

const ModificarOrden = () => {
    const [data, setData] = useState([]);

    const [page, setPage] = useState(1);
    const [tipo, setTipo] = useState("");
    const [mostrarE, setMostrarE, setMostrarEliminar] = useState(false);
    const [idFire, setIDFire] = useState("");
    const [nombre, setNombre] = useState("");
    const [unidades, setUnidades] = useState("");
    const [estado, setEstado] = useState("");
    const [tipoS, setTipoS] = useState("");
    const [numeroT, setNumeroT] = useState("");
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
        descripcion: "",
        unidades: "",
        estado: "",
        tipo: "",
        numeroT: "",
    });
    const [mostrarM, SetmostrarM] = useState(false);

    const getDocumentos2 = async () => {
        db.collection("OrdenesTrabajo").onSnapshot(function (data) {
            setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    };

    const elegirTipo = async () => {
        const temp = [];

        var opcion = tipo;

        const docEmpleados = db.collection("OrdenesTrabajo");
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
    }, [tipo]);

    const [archivoUrl, setArchivoUrl] = useState("");

    const archivoHandler = async (event) => {
        const archivo = event.target.files[0];
        swal({
            title: "¡Convirtiendo!",
            icon: "warning",
            text: "Un momento...",
            timer: 5000,
            button: false,
        });
        const storageRef = app.storage().ref("OrdenesTrabajo");
        const archivoPath = storageRef.child(archivo.name);
        await archivoPath.put(archivo);
        console.log("Archivo cargado ", archivo.name);
        const enlaceUrl = await archivoPath.getDownloadURL();
        setArchivoUrl(enlaceUrl);
    };

    const eliminarDocumento = async (index, e) => {
        e.preventDefault();
        console.log(index);
        const documentos = doc(db, "OrdenesTrabajo", index);
        console.log(documentos);

        deleteDoc(documentos);

        swal({
            title: "Orden de Trabajo Eliminada",
            text: "Se elimino la orden de trabajo exitosamente",
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
            unidades: documentos.cantidad_unidades,
            estado: documentos.estado,
            tipoS: documentos.tipo_vivienda,
            numeroT: documentos.numero_telefono,
            
        });
    };

    const modificar = async (e) => {
        e.preventDefault();
        const documento = doc(db, "OrdenesTrabajo", idDoc);

        var nombre = document.getElementById("nombre").value;
        var descripcion = document.getElementById("descripcion").value;
        var unidades = document.getElementById("unidades").value;
        var estado = document.getElementById("estado").value;
        var tipoS = document.getElementById("tipoS").value;
        var numeroT = document.getElementById("numeroT").value;

        if (nombre == " " || descripcion == " " || url2 === "") {
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
                cantidad_unidades: unidades,
                estado: estado,
                tipo_vivienda: tipoS,
                numero_telefono: numeroT,
            }).catch((error) => {
                swal({
                    title: "Surgio un error",
                    text: "No se modifico",
                    icon: "info",
                    button: "Aceptar",
                });
            });

            swal({
                title: "Orden de Trabajo Modificada",
                text: "Se modifico la orden de trabajo exitosamente",
                icon: "info",
                button: "Aceptar",
            });
        }
    }; //Fin

    const handleChange = (e) => {
        setTipoS(e.target.value);
    };

    const { slice, range } = useTable(data, page, 5);

    return (
        <>
            <NavAdmin></NavAdmin>
            <div className="contentm">
                <div className="text-center" style={{ margin: "50px 0px" }}>
                    <h1 style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "1%",
                        marginBottom: "80px",
                        borderBottom: "2px solid black",
                        fontSize: "30px"
                    }}
                    >Administración de Ordenes de Trabajo</h1>
                </div>
                <div className="container">
                    <div className="mt-4 mb-4 table-responsive">
                        <table className="table table-dark table-striped">
                            <thead className={styles.tableRowHeader}>
                                <tr className="align-me">
                                    <th style={{ textAlign: "center" }} scope="col">Cliente</th>
                                    <th style={{ textAlign: "center" }} scope="col">Descripcion</th>
                                    <th scope="col">Unidades</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">No. Telefono</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">EDITAR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slice.map((documentos, index) => (
                                    <tr key={index}>
                                        <td class="table-primary">{documentos.nombre}</td>
                                        <td class="table-primary">{documentos.descripcion}</td>
                                        <td style={{ textAlign: "center" }} class="table-primary">{documentos.cantidad_unidades}</td>
                                        <td class="table-primary">{documentos.estado}</td>
                                        <td class="table-primary">{documentos.tipo_vivienda}</td>
                                        <td class="table-primary">{documentos.numero_telefono}</td>
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
                    <ModalHeader closeButton>¿DESEA ELIMINAR LA ORDEN DE TRABAJO?</ModalHeader>

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
                    <ModalHeader>Modificar Orden de Trabajo</ModalHeader>
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

                                <label>Descripcion:</label>
                                <textarea
                                    id="descripcion"
                                    class="form-control"
                                    name="descripcion"
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    defaultValue={currentID && currentID.descripcion}
                                ></textarea>
                                <br />

                                <label>Unidades:</label>
                                <input
                                    type="text"
                                    id="unidades"
                                    className="form-control"
                                    onChange={(e) => setUnidades(e.target.value)}
                                    defaultValue={currentID && currentID.unidades}
                                    name="unidades"
                                />
                                <br />
                                <label>Estado:</label>
                                <br />
                                <select
                                    id="estado"
                                    onChange={(e) => setEstado(e.target.value)}
                                    defaultValue={currentID && currentID.estado}
                                    name="estado"
                                >
                                    <option>Completado</option>
                                    <option>Pendiente</option>
                                </select>
                                <br />
                                <br />

                                <label>Tipo:</label>
                                <br />
                                <select
                                    id="tipoS"
                                    onChange={(e) => setTipoS(e.target.value)}
                                    defaultValue={currentID && currentID.tipoS}
                                    name="tipoS"
                                >
                                    <option>Casa</option>
                                    <option>Negocio</option>
                                </select>
                                <br />
                                <br />
                                <label>No. Telefono:</label>
                                <input
                                    type="text"
                                    id="numeroT"
                                    className="form-control"
                                    onChange={(e) => setUnidades(e.target.value)}
                                    defaultValue={currentID && currentID.numeroT}
                                    name="numeroT"
                                />
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
                                        Modificar
                                    </Button>
                                </ModalFooter>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>

                <Link to="adminOrders">
                    <button type="button" class="btn btn-danger" style={{ marginLeft: "70%", marginRight: "1%" }}>
                        Regresar
                    </button>
                </Link>
                <Link to="AgregarOrden">
                    <button type="button" class="btn btn-secondary" >
                        Agregar Orden de Trabajo
                    </button>
                </Link>
            </div>
        </>
    );
};

export default ModificarOrden;