import React, { useEffect, useState, Component } from "react";
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
import swal from "sweetalert";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Table.module.css";
import useTable from "./useTable";
import TableFooter from "./TableFooter";



const AdmiInventario = ({ rowsPerPage }) => {
  const [data, setData] = useState([]);
  const [mostrarE, setMostrarE] = useState(false);
  const [opcionE, setopcionE] = useState(false);
  const [id, setID] = useState("");
  const [mostrarM, SetmostrarM] = useState(false);
  let hoy = new Date();
  let fechaActual =
   hoy.getDate()+"-"+ (hoy.getMonth() + 1) +"-"+hoy.getFullYear();

  const [cantidad,setCantidad] = useState("");
  const [currentID, setCurrentID] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    cantidad:"",
    url: ""
  });


  const [currentID2, setCurrentID2] = useState({
    id: null,
    nombre: "",
    descripcion:"",
    cantidad: "",
    url: ""
  });

  const [mostrarV, setMostrarV] = useState(false);

  const [paginated, setPaginated] = useState();

  const [page, setPage] = useState(1);
  const [vista, setVista] = useState({
    id: null,
    nombre: "",
    descripcion:"",
    disponibilidad: "",
    url: ""
  });

 
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");

  //const [url, setUrl] = useState("");
 

  const [image, setImage] = useState("");
  const [imageurl, setimageURL] = useState("");
  const [idFire, setIDFire] = useState("");
  const [q, setQ] = useState("");
  const [imageurl2, setimageURL2] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const getInventario = async () => {
    const temp = [];
    db.collection("Inventario").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });

      setData(temp);
    });
  };

  useEffect(() => {
    const fecthData = async () => {
      db.collection("Inventario").onSnapshot(function (data) {
        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    fecthData();
  }, []);

  const { slice, range } = useTable(data, page, 5);

  const refrescar = () => {
    window.location.reload(false);
  };

  const eliminarInventario = async (id) => {
    const inventario = doc(db, "Inventario", id);

    deleteDoc(inventario);
    mostrarModalEliminar();

  
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



  const obtener = (inventario) => {
    try {
      console.log("Entro");
      setIDFire(inventario.id);

      setCurrentID({
        id: inventario.id,
        nombre: inventario.nombre,
        descripcion: inventario.descripcion,
        cantidad: inventario.cantidad,
        url: inventario.url
      });
    } catch (error) {}
  };

  const editRow = (inventario) => {
    obtener(inventario);
   
    if (mostrarM === false) {
      SetmostrarM(!mostrarM);
    } else {
      SetmostrarM(!mostrarM);
    }

    if (inventario.url) {
      setimageURL(inventario.url);
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

    const empleadosDoc = doc(db, "Inventario", idFire);

    var nombre2 = document.getElementById("nombre").value;
    var descripcion2 = document.getElementById("descripcion").value;
    var cantidad2 = document.getElementById("cantidad").value;
    
   

  

    if (
      nombre2 == " " ||
      descripcion == " " ||
      cantidad2 == " " ||
      imageurl == " "
    ) {
      swal({
        title: "No se realizo",
        text: "No se modifico el empleado, verifique los campos",
        icon: "warning",
        button: "aceptar",
      });
    } else {
      setIsloading(true);
      await updateDoc(empleadosDoc, {
        nombre: nombre2,
        cantidad: cantidad2,
        fecha: fechaActual,
        descripcion: descripcion2,
        url: imageurl
      }).catch((error) => {
        swal({
          title: "Surgio un error",
          text: "No se modifico",
          icon: "info",
          button: "aceptar",
        });
      });
      console.log(nombre);
      //await new Promise(resolve=> setTimeout(resolve, 2000));

      const uploadtask = almacenamiento
        .ref("Inventario/" + idFire)
        .put(image);
      uploadtask
        .then((uploadtaskSnapshot) => {
          return uploadtaskSnapshot.ref.getDownloadURL();
        })
        .then((url) => {
          updateDoc(doc(db, "Inventario", idFire), {
            url: url,
          });
          setIsloading(false);
        });

      swal({
        title: "Inventario Modificado",
        text: "Se modifico el empleado exitosamente",
        icon: "info",
        button: "aceptar",
      });
    }
   
  }; //Fin

  const cambiarFoto = (e) => {
    e.target.src = imageurl;
  };

  const mostrarVistaEmpleado = (inventario) => {
    setVista({
      nombre: inventario.nombre,
      descripcion: inventario.descripcion,
      fecha: inventario.fecha,
      url: inventario.url,
      cantidad: inventario.cantidad
     
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
     <div className="text-center" style={{margin:"50px 0px"}}>
       <h1>Inventario</h1>
       <hr></hr>
     </div>


     <div className="container">
       <div className="mt-4 mb-4 table-responsive">
         <table className="table table-hover table-dark">
           <thead className={styles.tableRowHeader}>
             <tr className="align-me">    
                     
               <th scope="col">Nombre</th>
               <th scope="col">Descripcion</th>
               <th scope="col">Cantidad</th>
               <th scope="col">Fecha</th>
               <th scope="col">EDITAR</th>
             </tr>
           </thead>
           <tbody>
             {slice.map((inventario, index) => (

               <tr key={index}>
              
                 <td class="table-primary">{inventario.nombre}</td>

                 <td class="table-primary">{inventario.descripcion}</td>
                 <td class="table-primary">{inventario.cantidad}</td>
                 <td class="table-primary">{inventario.fecha}</td>

                 
                 <td class="table-primary">
                   <div
                     class="btn-group"
                     role="group"
                     aria-label="Basic example"
                   >
                     <Button
                       color="success"
                       onClick={() => editRow(inventario)}
                       
                       
                     >
                       <i class="bi bi-pencil"></i>
                     </Button>

                     <Button
                       color="success"
                       onClick={() => setMostrarE(true)}
                       onClick={() => mostrarModalEliminar(inventario.id)}
                     >
                       <i class="bi bi-trash2"></i>
                     </Button>

                     <Button
                       color="success"
                       onClick={() => mostrarVistaEmpleado(inventario)}
                     >
                      <i class="bi bi-view-list"></i>
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
          <ModalHeader closeButton>¿DESEA ELIMINAR EL EMPLEADO?</ModalHeader>

          <ModalFooter>
            <Button
              type="button"
              variant="primary"
              onClick={() => eliminarInventario(id)}
              style={{background:"red"}}
            >
              SI
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => mostrarModalEliminar()}
              style={{background:"rgb(70,130,180)"}}
            >
              NO
            </Button>
          </ModalFooter>
        </Modal>

        {/* MODAL PARA MOSTRAR OBJETOS */}

        <Modal isOpen={mostrarM}>
          <ModalHeader>Modificar Inventario</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <form onSubmit={(e) => modificar(e)}>
                <label>Nombre herramienta: </label>
                <br />
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  onChange={(e) => setNombre(e.target.value)}
                  defaultValue={currentID && currentID.nombre}
                  name="nombre"
                /
                >

            <label>Cantidad: </label>
                <br />
                <input
                  type="number"
                  id="cantidad"
                  className="form-control"
                  onChange={(e) => setCantidad(e.target.value)}
                  defaultValue={currentID && currentID.cantidad}
                  name="cantidad"
                
                />
                
                <br />
               
                <label>Descripcion</label>
                <br />
                <textarea
                  id="descripcion"
                  class="form-control"
                  name="descripcion"
                  placeholder="Descripcion herramienta"
                  onChange={(e) => setDescripcion(e.target.value)}
                  defaultValue={currentID && currentID.descripcion}
                ></textarea>
            
                

                <label> Foto Herramienta </label>
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
                    style={{background:"red"}}
                  >
                    Salir
                  </Button>
                  <Button type="submit" class="btn btn-outline-danger" style={{background:"rgb(70,130,180)"}}>
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
            <img src={vista.url} class="card-img-top" alt="..."></img>
            <div class="container">
             
              <div class="col">
                <label>
                  {" "}
                  <strong>Descripcion:</strong>
                </label>
                <label>&nbsp;&nbsp;{vista.descripcion}</label>
              </div>

              <div class="col">
                <label>
                  {" "}
                  <strong>Fecha:</strong>
                </label>
                <label>&nbsp;&nbsp;{vista.fecha}</label>
              </div>

              <div class="col align-self-start">
                <label>
                  <strong>Cantidad:</strong>
                </label>
                <label>&nbsp;&nbsp;{vista.cantidad}</label>
              </div>
            </div>

            

            <ModalFooter>
              <Button
                type="button"
                class="btn btn-outline-danger"
                onClick={() => setMostrarV(false)}
                style={{background:"red"}}
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

export default AdmiInventario;
