import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, updateDoc, doc } from "@firebase/firestore";
import { dbEmpleado, db } from "../..//components/firebase";
import logo from "../../img/logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import "./Formulario.css";
import swal from "sweetalert";
import EmployeeNavigation from "./EmployeeNavigation";

const ModificarEmpleado = () => {
    const [sidebar, setSidebar] = useState(false);
    const tablaEmpleadosRef = collection(dbEmpleado, "Empleados");
    const showSidebar = () => setSidebar(!sidebar);
    const [dats, setDatos] = useState({
        nombre: " ",
        id: " ",
        numero: " ",
        correo: " ",
    });

    const handleInputChance = (event) => {
        console.log(event.target.value);
        setDatos({
            ...dats,
            [event.target.name]: event.target.value,
        });
    };

    const [empleados, loading, error] = useCollectionData(
        collection(db, "Empleados"),
        { idField: "id" }
    );

    const inactivarEmpleado = async (id, estado) => {
        const ordenesDoc = doc(dbEmpleado, "Empleados", id)
        const nuevoEstado = { estado: "Inactivo" };
        await updateDoc(ordenesDoc, nuevoEstado)
        swal({
            title: "Completada",
            text: "Empleado Desactivado",
            icon: "info",
            button: "Aceptar"
        });
        
    };

    return (
        <>
            <EmployeeNavigation></EmployeeNavigation>
                <div>
                    <h1 className="tituloh1">Listar Empleado</h1>
                    <table className="ta" align="center">
                        <thead>
                            <tr className="ta">
                                <th scope="col">Nombre De Empleado</th>
                                <th scope="col">DNI</th>
                                <th scope="col">Numero de Telefono</th>
                                <th scope="col">Correo Electronico</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados
                                ? empleados.map((item) => {
                                    return (
                                        <tr className="ta" key={item.id}>
                                            <td>{item.nombre}</td>
                                            <td>{item.dni}</td>
                                            <td>{item.n_telefono}</td>
                                            <td>{item.correo}</td>
                                            <td>{item.estado} <button onClick={() => {
                                            inactivarEmpleado(item.id, item.estado)
                                            }
                                            }>Inactivar</button> </td>
                                        </tr>
                                    );
                                })
                                : null}
                        </tbody>
                    </table>
                </div>
        </>
    );
};

export default ModificarEmpleado;
