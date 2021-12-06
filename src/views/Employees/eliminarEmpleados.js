import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { db, auth, registerWithEmailAndPassword,almacenamiento } from "../../components/firebase"
import { collection, doc, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { useForm } from 'react-hook-form'
import swal from "sweetalert";



const EliminarEmpleados = () => {

    const [data, setData] = useState([]);
    const [mostrarE, setMostrarE] = useState(false);
    const [opcionE, setopcionE] = useState(false);
    const [id, setID] = useState("");
    const [mostrarM, SetmostrarM] =useState(false);
    const [currentID, setCurrentID] = useState({
        id: null, nombre: '', dni: '', correo: '', telefono: '', estado: '', foto:''
    });



    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState("");
    const [dni, setDNI] = useState("");
    const [telefono, setTelefono] = useState("");
    const [estado, setEstado] = useState("");
    const [foto, setFoto] = useState("");
    const [direccion, setDireccion] = useState("");

    const [image, setImage] = useState('');
    const [imageurl, setimageURL] = useState('');
    const [idFire, setIDFire] = useState("");


    const [dats, setDatos] = useState({
        nombre: " ",
        dni: " ",
        numero: " ",
        correo: " ",
        direccion: " ",
        estado: "ACTIVO",
        foto: ""
      });
    
      const handleInputChance = (event) => {
        setDatos({
          ...dats,
          [event.target.name]: event.target.value,
        });
      };
    
    


    const getEmpleados = async () => {
        const temp = [];
        db.collection('Empleados').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });

           

            setData(temp);
        });
    };

  


    const refrescar=()=> {
        window.location.reload(false);
      
     }

     

    const eliminarEmpleado = async (id) => {
        const empleado = doc(db, "Empleados", id);
        
        deleteDoc(empleado);
        mostrarModalEliminar();

        getEmpleados();
       
       
    }

    const mostrarModalEliminar = (index) => {
        setID(index)
        
        

        if (mostrarE === false) {
            setMostrarE(!mostrarE);

        } else {
            setMostrarE(!mostrarE);
        }

    }

    const handleFileSubmit = (e) => {
        if (!(e.target.files[0].name.toLowerCase().endsWith('.png') || e.target.files[0].name.toLowerCase().endsWith('.jpg'))) {
          swal({
            title: "Formato de archivo no aceptable",
            text: "El archivo subido no es una foto, por favor asegurarse de subir una imagen formato png o jpeg",
            icon: "warning",
            button: "aceptar",
          });
          e.target.value = null;
          setimageURL(null);
          setImage(null);
          return;
        }
        setimageURL(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
      };



    const modificar = async () => {
        
        const empleadosDoc = doc(db, "Empleados",idFire);
        
        console.log("entro")

  
            if (dats.nombre == " " || dats.telefono == " " || dats.id == " " || dats.correo == " " || image === null) {
                swal({
                    title: "No se realizo",
                    text: "No se modifico el empleado, verifique los campos",
                   icon: "warning",
                    button: "aceptar"
                  });


            }
             else{
            

            await updateDoc(empleadosDoc, { nombre: dats.nombre,
                dni: dats.dni, correo: dats.correo, n_telefono: dats.telefono, estado: dats.estado, direccion: dats.direccion
            });
                console.log("Entro");
                console.log(nombre);

                const uploadtask = almacenamiento.ref('/UsuarioFotos/'+idFire).put(image);
                uploadtask.then(uploadtaskSnapshot => {
                return uploadtaskSnapshot.ref.getDownloadURL();
                }).then(url => {
                  updateDoc(doc(db,'Empleados',idFire), {
                    foto: url, 
                  })
                });

                swal({
                    title: "Empleado Modificado",
                    text: "Se modifico el empleado exitosamente",
                    icon: "info",
                    button: "aceptar"
                  });
                }
                editRow();
                console.log(dats);

                
      
    
    }//Fin 

    useEffect(() => {
        getEmpleados();
       
    }, []);


  
        

    const editRow = (empleados) => {
    
        
        if (mostrarM === false) {
            setIDFire(empleados.id);

            setCurrentID({id: empleados.dni, nombre: empleados.nombre,correo: empleados.correo, telefono: empleados.n_telefono, foto: empleados.foto, estado: empleados.estado, direccion: empleados.direccion});
           
           
        
            SetmostrarM(!mostrarM);
        
        } else {
            SetmostrarM(!mostrarM);
        }

    }


    
    






    return (

        <div className="container col-md-12 mt-4">
            <div className="text-center">
                <h1>Empleados</h1>
                <hr></hr>
            </div>
            <div className="container">
                <div className="mt-4 mb-4 table-responsive"  >
                    <table className="table table-dark table-striped table-bordered table-hover" >
                        <thead className="thead-dark">
                            <tr className="text-center">
                                <th scope="col">NOMBRE</th>
                                <th scope="col">FOTO</th>
                                <th scope="col">DNI</th>
                                <th scope="col">TELEFONO</th>
                                <th scope="col">CORREO</th>
                                <th scope="col">ESTADO</th>
                                <th scope="col">DIRECCION</th>
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
                                    <td>{empleados.direccion}</td>
                                    
                                    <td>        

                                    <Button color="success"  onClick={() => SetmostrarM(true)} onClick={() => editRow(empleados,index)}  >
                                           Modificar
                                        </Button>
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
                    <Button type="button"  variant="primary" onClick={() => eliminarEmpleado(id)} >SI</Button>
                
                    <Button type="button" variant="secondary" onClick={() => mostrarModalEliminar()} >NO</Button>
                </ModalFooter>



            </Modal>


             {/* MODAL PARA MOSTRAR OBJETOS */}
             <Modal isOpen={mostrarM} >
                <ModalHeader>Modificar Empleado</ModalHeader>
                <ModalBody>

                    <div className="form-group">
                        <form   >

                            <label>Nombre: </label>
                            <br />
                            <input type="text" className="form-control"  onChange={handleInputChance} defaultValue={currentID && currentID.nombre} name="nombre" />
                            <br />
                            <label>DNI: </label>
                            <br />
                            <input type="text" className="form-control" onChange={handleInputChance} defaultValue={currentID &&  currentID.dni} name="id" />
                            <br />
                            <label>Correo: </label>
                            <br />
                            <input type="text" className="form-control" onChange={handleInputChance} defaultValue={currentID && currentID.correo} name="correo" />
                            <br />
                            <label>Telefono </label>
                            <br />
                            <input type="text" className="form-control" onChange={handleInputChance} defaultValue={currentID && currentID.telefono} name="telefono" />
                            <br/>
                            <label>Direccion</label>
                            <br/>
                            <textarea
                             id="i_dirrecion" 
                            class="form-control"
                             name="direccion"
                             placeholder="Direccion donde reside el empleado"
                             onChange={handleInputChance} defaultValue={currentID && currentID.direccion}
                            ></textarea>
                            <label>Estado Empleado</label>
                            <br/>
                            <select  onChange={handleInputChance} defaultValue={currentID && currentID.estado}>
                            <option >Activo</option>
                             <option>Inactivo</option>
                          
                            </select>

                            <label> Foto Empleado </label>
                            <br/>
                            

                            <div>
                          <img id="foto" src = {imageurl} class="form-control"/>;
                            </div>

              <div class="form-control">

                <input
                  id="b_file" 
                  type="file" 
                  class="form-control-file" 
                  accept=".jpg,.png" 
                  onChange={handleFileSubmit}/>

              </div>
                            


                        </form>
                    </div>


                </ModalBody>

                <ModalFooter>
                    <Button type="button" class="btn btn-outline-danger"   onClick={()=>editRow()}>SALIR</Button>
                </ModalFooter>

                <ModalFooter>
                    <Button type="button" class="btn btn-outline-danger" onClick={() => modificar()}   onClick={()=>editRow()}   >Modificar</Button>
                </ModalFooter>
            </Modal>


        </div>
    )
}

export default EliminarEmpleados;
