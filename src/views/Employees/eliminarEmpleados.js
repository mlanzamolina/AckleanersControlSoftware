import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { db, auth, registerWithEmailAndPassword } from "../../components/firebase"
import { collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { useForm } from 'react-hook-form'


const EliminarEmpleados = () => {

    const [data, setData] = useState([]);
    const [mostrarE, setMostrarE] = useState(false);
    const [opcionE, setopcionE] = useState(false);
    const [id, setID] = useState("");


    const getEmpleados = async () => {
        const temp = [];
        db.collection('Empleados').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });



            setData(temp);
        });
    };


    const eliminarEmpleado = async (id) => {
        const empleado = doc(db, "Empleados", id);

        deleteDoc(empleado);
    }

    const mostrarModalEliminar = (index) => {
        setID(index)

        if (mostrarE === false) {
            setMostrarE(!mostrarE);

        } else {
            setMostrarE(!mostrarE);
        }

    }

    useEffect(() => {
        getEmpleados();
    }, []);






    return (

        <div className="container col-md-12 mt-4">
            <div className="text-center">
                <h1>Empleados</h1>
                <hr></hr>
            </div>
            <div className="container">
                <div className="mt-4 mb-4 table-responsive" >
                    <table className="table table-dark table-striped table-bordered table-hover" >
                        <thead className="thead-dark">
                            <tr className="text-center">
                                <th scope="col">NOMBRE</th>
                                <th scope="col">FOTO</th>
                                <th scope="col">DNI</th>
                                <th scope="col">TELEFONO</th>
                                <th scope="col">CORREO</th>
                                <th scope="col">ESTADO</th>
                                <th scope="col">EDITAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((empleados, index) => (
                                <tr className="text-center" key={index}>
                                    <td>{empleados.nombre}</td>
                                    <td>{empleados.foto}</td>
                                    <td>{empleados.dni}</td>
                                    <td>{empleados.n_telefono}</td>
                                    <td>{empleados.correo}</td>
                                    <td>{empleados.estado}</td>
                                    <td>
                                        <Button color="success" onClick={() => setMostrarE(true)} onClick={() => mostrarModalEliminar(empleados.id)}  >
                                            Eliminar
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>



                </div>
            </div>
            <Modal isOpen={mostrarE} >
                <ModalHeader closeButton >¿DESEA ELIMINAR EL EMPLEADO?</ModalHeader>

                <ModalFooter>
                    <Button type="submit" className="center" variant="primary" onClick={() => eliminarEmpleado(id)} >SI</Button>
                
                    <Button type="button" variant="secondary" onClick={() => mostrarModalEliminar()} >NO</Button>
                </ModalFooter>



            </Modal>


        </div>
    )
}

export default EliminarEmpleados;
