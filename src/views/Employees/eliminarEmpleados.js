import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
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
        id: null, nombre: '', dni: '', correo: '', telefono: '', estado: '', foto:'', direccion:''
    });
    const [currentID2, setCurrentID2] = useState({
        id: null, nombre: '', dni: '', correo: '', telefono: '', estado: '', foto:'', direccion:''
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

    
   
    

    const getEmpleados = async () => {
        const temp = [];
        db.collection('Empleados').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });

           

            setData(temp);
        });
    };

    useEffect(() => {
        getEmpleados();
       
       
    }, [data]);


  

  


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

      const handleInputChance = (event) => {
         
        setCurrentID2({
          ...currentID2,
          [event.target.name]: event.target.value,
        });
      };



      const editRow = (empleados) => {
          obtener(empleados)
            
        if (mostrarM === false) {
            
        
            SetmostrarM(!mostrarM);
        
        } else {
            SetmostrarM(!mostrarM);
        }

        

    }


const obtener =  (empleados)=>{
        setIDFire(empleados.id);

        setCurrentID({id: empleados.dni, nombre: empleados.nombre,correo: empleados.correo, 
            telefono: empleados.n_telefono, 
            foto: empleados.foto, estado: empleados.estado, 
            direccion: empleados.direccion});



    }


    

    /*const obtener2 = ()=>{

        setCurrentID2({dni: dni, nombre: nombre,correo: correo, 
            telefono: telefono, 
            foto: foto, estado: estado, 
            direccion: direccion});
            
    }*/




    const modificar = async (e) => {
        e.preventDefault();
    
        
        const empleadosDoc = doc(db, "Empleados",idFire);

        var nombre2 = document.getElementById("nombre").value;
        var id2 = document.getElementById("id").value;
        var telefono2 = document.getElementById("telefono").value;
        var correo2 = document.getElementById("correo").value;
        var direccion2 = document.getElementById("direccion").value;
        var estado2 = document.getElementById("estado").value;

        console.log(id2);
        
      

  
           if (nombre2 == " " || telefono2 == " " || id2 == " " || correo2 == " " ) {
                swal({
                    title: "No se realizo",
                    text: "No se modifico el empleado, verifique los campos",
                   icon: "warning",
                    button: "aceptar"
                  });


            }
             else{
              

            await updateDoc(empleadosDoc, { nombre: nombre2,
                dni: id2, correo: correo2, n_telefono:telefono2, estado: estado2, direccion: direccion2
            }).catch((error)=>{
                swal({
                    title: "Surgio un error",
                    text: "No se modifico",
                    icon: "info",
                    button: "aceptar"
                })
            })
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

    
    }//Fin 

  


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
                            {data.map(( empleados,index) => (
                                <tr className="text-center" key={index}>
                                    <td>{empleados.nombre}</td>
                                    <td>{empleados.foto}</td>
                                    <td>{empleados.dni}</td>
                                    <td>{empleados.n_telefono}</td>
                                    <td>{empleados.correo}</td>
                                    <td>{empleados.estado}</td>
                                    <td>{empleados.direccion}</td>
                                    
                                    <td>        

                                    <Button color="success"  onClick={()=>editRow(empleados) }   >
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
                         <form  onSubmit={(e)=>modificar(e)}>
                    
                       
                       
                
                            <label>Nombre: </label>
                            <br />
                            <input type="text"  id="nombre" className="form-control"  onChange={(e) => setNombre(e.target.value)}defaultValue={currentID && currentID.nombre} name="nombre" />
                            <br />
                            <label>DNI: </label>
                            <br />
                            <input type="text" id="id" 
                              className="form-control"
                              onChange={(e) => setDNI(e.target.value)}
                               defaultValue={currentID &&  currentID.id}
                                pattern="[0-9]{13}"
                                title="numero 13 digitos sin nada extra"/>
                            <br />
                            <label>Correo: </label>
                            <br />
                            <input type="text" id="correo" className="form-control"
                           
                            onChange={(e) => setCorreo(e.target.value)} defaultValue={currentID && currentID.correo} name="correo" />
                            <br />
                            <label>Telefono </label>
                            <br />
                            <input type="text" id="telefono" className="form-control" 
                            onChange={(e) => setTelefono(e.target.value)} 
                            pattern="[0-9]{8}"
                          title="numero 8 digitos sin nada extra"
                            defaultValue={currentID && currentID.telefono} name="telefono" />
                            <br/>
                            <label>Direccion</label>
                            <br/>
                            <textarea
                             id="direccion" 
                            class="form-control"
                             name="direccion"
                             placeholder="Direccion donde reside el empleado"
                             onChange={(e) => setDireccion(e.target.value)} defaultValue={currentID && currentID.direccion}
                            ></textarea>
                            <label>Estado Empleado</label>
                            <br/>
                            <select id="estado"  onChange={(e) => setEstado(e.target.value)} defaultValue={currentID && currentID.estado}>
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
                         
                       <ModalFooter>
                          <Button type="button" class="btn btn-outline-danger"   onClick={()=>SetmostrarM(false)}>SALIR</Button>
                         <Button type="submit" class="btn btn-outline-danger" >Modificar</Button>
                         </ModalFooter>
                    </form>
                         
                    
                      
                     </div>
                     
                     

                     </ModalBody>

                    
                     
                       
                   
                   
                  
               

                     </Modal>
                   
                   
                
                   

                     </div>
                   

                  
                   
       
            


        
      
    )
}

export default EliminarEmpleados;
