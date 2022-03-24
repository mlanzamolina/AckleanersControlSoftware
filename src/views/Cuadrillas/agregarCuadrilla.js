import React from 'react'
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../components/firebase";
import "./estiloCuadrillas.css";
import { db, app } from "../../components/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Nav from "../NavAdmin";
import swal from 'sweetalert';

let hoy = new Date();
let fechaActual = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();

export const AgregarCuadrilla = () => {
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (user === null) window.location.assign("/Login");
    }, [user, loading]);


    const [valueEmpleado, setValueEmpleado] = useState([]);

    const [valueHerramienta, setValueHerramienta] = useState([]);

    function addEmpleado(e) {
        e.preventDefault();
        var getElementoEmpleado = document.getElementById('id_empleados').value

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
            setValueEmpleado([...valueEmpleado, getElementoEmpleado])
        }
    }

    function addHerramienta(e) {
        e.preventDefault();
        var getElementoHerramienta = document.getElementById('i_herramientas').value
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
        setValueHerramienta([...valueHerramienta, getElementoHerramienta])
    }

    const [empleados, emp_loading, emp_error] = useCollectionData(
        collection(db, "Empleados"),
        { idField: "id" }
    );

    const [inventario, inv_loading, inv_error] = useCollectionData(
        collection(db, "Inventario"),
        { idField: "id" }
    );

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
        const tablaDocumentosRef = app.firestore().collection("Cuadrillas");

        const cuadrilla = tablaDocumentosRef.doc().set({
            nombreCuadrilla: idCuadrilla,
            empleadosCuadrilla: valueEmpleado,
            herramientasCuadrillas: valueHerramienta,
            fechaCreacion: fechaCuadrilla,
            comentarioCuadrilla: descripCuadrilla,
        });
        swal({
            title: "¡Agregado!",
            text: "Cuadrilla agregada a la base de datos",
            icon: "info",
            button: "Aceptar",
        });

        document.getElementById("i_nombre").value = null;
        document.getElementById("id_empleados").value = "Seleccione empleado (s)";
        document.getElementById("i_herramientas").value = "Seleccione herramienta (s)";
        document.getElementById("i_descripcion").value = null;
        setValueEmpleado([])
        setValueHerramienta([])
        return;
    };


    return (
        <>
            <Nav></Nav>
            <form onSubmit={cargarDatos}>
                <div className="p-2 contenedorPrincipal">
                    <h1 style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "1%",
                        marginBottom: "80px",
                        borderBottom: "2px solid black",
                        fontSize: "30px"
                    }}
                    >Agregar Cuadrilla de Trabajo</h1>
                    <div style={{ width: "90%" }} className="container rounded contenedorFormularioCuadrillas">
                        <div style={{ marginBottom: "100%" }}>
                            <div class="mb-3 col-md-12">
                                <label
                                    for="exampleFormControlInput1"
                                    className="form-label letrasFormulario"
                                    style={{ marginTop: "2%", paddingLeft: "80%", fontSize: "18px" }}
                                >
                                    Fecha actual: {fechaActual}
                                </label>
                            </div>
                            <div class="mb-3 col-md-6">
                                <label
                                    for="exampleFormControlInput1"
                                    className="form-label letrasFormulario"
                                >
                                    Identificador de Cuadrilla
                                </label>
                                <input
                                    type="text"
                                    class="form-control rounded"
                                    id="i_nombre"
                                    placeholder="Ingrese nombre o identificador de la cuadrilla"
                                    name="nombreCuadrilla"
                                ></input>
                            </div>
                            <div class="mb-3 col-md-6">
                                <label
                                    for="exampleFormControlInput1"
                                    className="form-label letrasFormulario"
                                >
                                    Seleccione Empleado (s) Para la Cuadrilla
                                </label>
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
                                                    {"[ID Empleado: " + item.id + "]" +
                                                        " [Nombre:" + item.nombre + "]"}
                                                </option>
                                            );
                                        })
                                        : null}
                                </select>
                                <div
                                    className="mb-3 col-md-8 rounded estiloAgregados letrasAgregados"
                                >
                                    <label style={{ marginLeft: "1%" }}>Empleado(s) asignados:</label>
                                    {valueEmpleado.map(name => <h2 class="indentadoAgregados">{name}</h2>)}
                                </div>
                                <button
                                    class="mb-3 col-md-8 btn btn-success"
                                    onClick={addEmpleado}
                                >
                                    Agregar
                                </button>
                            </div>
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
                                                    {"[Nombre: " + item.nombre + "]" +
                                                        "[Descripcion: " + item.descripcion + "]"}
                                                </option>
                                            );
                                        })
                                        : null}
                                </select>
                                <div
                                    className="mb-3 col-md-6 rounded estiloAgregados letrasAgregados"
                                >
                                    <label style={{ marginLeft: "1%" }}>Herramienta (s) asignadas:</label>
                                    {valueHerramienta.map(name => <h2 class="indentadoAgregados">{name}</h2>)}
                                </div>
                                <button
                                    class=" mb-3 col-md-6 btn btn-success"
                                    onClick={addHerramienta}
                                >
                                    Agregar
                                </button>
                            </div>
                            <div class="mb-3 col-md-8">
                                <label
                                    for="exampleFormControlTextarea1"
                                    className="form-label letrasFormulario"
                                >
                                    Indicaciones para Cuadrilla
                                </label>
                                <textarea
                                    placeholder="Ingrese indicaciones para la cuadrilla"
                                    className="form-control"
                                    id="i_descripcion"
                                    style={{ resize: "none" }}
                                    rows="3"
                                    name="descripcionCuadrilla"
                                ></textarea>
                            </div>

                            <div class="col-12 offset-lg-7">
                                <button
                                    type="submit"
                                    class="btn btn-success"
                                    style={{
                                        marginBottom: "5%",
                                        marginRight: "2%",
                                        marginTop: "5%",
                                    }}
                                >
                                    Cargar
                                </button>

                                <Link to="/interfazCuadrillas">
                                    <button
                                        type="submit"
                                        class="btn btn-danger"
                                        style={{ marginBottom: "5%", marginTop: "5%" }}
                                    >
                                        Volver
                                    </button>
                                </Link>

                                <Link to="/modificarCuadrilla">
                                    <button
                                        type="submit"
                                        class="btn btn-secondary"
                                        style={{ marginLeft: "2%", marginBottom: "5%", marginTop: "5%" }}
                                    >
                                        Administrar Cuadrillas
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}