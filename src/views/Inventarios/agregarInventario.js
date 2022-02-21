import React, { Fragment, useState, useEffect } from "react";
import { app } from "../../components/firebase";
import "./estiloInventario.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Nav from "../NavAdmin";

export const AgregarInventario = () => {

  let hoy = new Date();
  let fechaActual = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
  const [articuloUrl, setArticuloUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const archivoHandler = async (event) => {
    const archivo = event.target.files[0];
    swal({
      title: "¡Añadiendo el articulo!",
      icon: "warning",
      text: "Un momento...",
      timer: 2000,
      button: false,
    });
    setIsLoading(true);
    const storageRef = app.storage().ref("Inventario");
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArticuloUrl(enlaceUrl);
    setIsLoading(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const nombreArticulo = event.target.nombre.value;
    if (!nombreArticulo) {
      swal({
        title: "No se realizo",
        text: "Coloque un nombre para el articulo",
        icon: "warning",
        button: "aceptar",
      });
      return;
    }
    const descripcionArticulo = event.target.descripcion.value;
    if (!descripcionArticulo) {
      swal({
        title: "No se realizo",
        text: "Coloque una descripcion para el articulo",
        icon: "warning",
        button: "aceptar",
      });
      return;
    }

    const cantidadArticulo = event.target.cantidad.value;
    if(cantidadArticulo <= 0 || cantidadArticulo === null){
      swal({
        title: "No se realizo",
        text: "Coloque una cantidad valida para el articulo",
        icon: "warning",
        button: "aceptar",
      });
      return;
    }
  

    const fechaArticulo = fechaActual;

    const tablaDocumentosRef = app.firestore().collection("Inventario");
    const documento = tablaDocumentosRef.doc().set({
      nombre: nombreArticulo,
      descripcion: descripcionArticulo,
      cantidad: cantidadArticulo,
      url: articuloUrl,
      fecha: fechaArticulo,
    });

    swal({
      title: "¡Agregado!",
      text: "Archivo agregado a la base de datos",
      icon: "info",
      button: "Aceptar",
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    document.getElementById("i_nombre").value = null;
    document.getElementById("i_descripcion").value = null;
    document.getElementById("i_cantidad").value = null;
    document.getElementById("i_foto").value = null;
    return;
  };

  return (
    <>
      <Nav></Nav>
      <form onSubmit={submitHandler}>
        <div className="p-2 contenedorPrincipalInv">
        <h1 style={{
            width:"100%",
            textAlign:"center", 
            marginTop:"1%", 
            marginBottom:"80px",
            borderBottom:"2px solid black",
            fontSize:"30px"
          }}
            >Agregar Inventario</h1>
          <div className="container rounded contenedorFormularioInv">
            <div style={{ marginBottom: "100%" }}>
              <div class="mb-3 col-md-12">
                <label
                  for="exampleFormControlInput1"
                  className="form-label letrasFormularioInv"
                  style={{ marginTop: "2%", paddingLeft: "80%", fontSize: "18px" }}
                >
                  Fecha actual: {fechaActual}
                </label>
              </div>
              <div class="mb-3 col-md-6">
                <label
                  for="exampleFormControlInput1"
                  className="form-label letrasFormularioInv"
                >
                  Nombre del Articulo
                </label>
                <input
                  type="text"
                  class="form-control rounded"
                  id="i_nombre"
                  placeholder="Ingrese nombre"
                  name="nombre"
                ></input>
              </div>
              <div class="mb-3 col-md-8">
                <label
                  for="exampleFormControlTextarea1"
                  className="form-label letrasFormularioInv"
                >
                  Descripcion del Articulo
                </label>
                <textarea
                  placeholder="Ingrese descripcion del articulo..."
                  className="form-control"
                  id="i_descripcion"
                  style={{ resize: "none" }}
                  rows="3"
                  name="descripcion"
                ></textarea>
              </div>
              <div class="mb-3 col-md-4">
              <label
                  for="exampleFormControlInput1"
                  className="form-label letrasFormularioInv"
                >
                  Cantidad del Articulo
                </label>
                <input
                  type="text"
                  class="form-control rounded"
                  id="i_cantidad"
                  placeholder="Ingrese nombre"
                  name="cantidad"
                ></input>
              </div>

              <div class="offset-lg-4">
                <input
                  id="i_foto"
                  type="file"
                  placeholder="Cargar documento..."
                  style={{ marginTop: "5%" }}
                  onChange={archivoHandler}
                />
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
                  {isLoading ? 
                  <h1 class="btn btn-sucess" type="button" disabled>
                  <span style={{background:"white"}} class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span class="sr-only" style={{color:"white"}} >Cargando...</span>
                </h1> : <h1>Ingresar Articulo</h1>
                  }
                </button>

                <Link to="/inventarios">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    style={{ marginBottom: "5%", marginTop: "5%" }}
                  >
                    Regresar
                  </button>
                </Link>

                <Link to="/inventarios">
                  <button
                    type="submit"
                    class="btn btn-secondary"
                    style={{ marginLeft: "2%", marginBottom: "5%", marginTop: "5%" }}
                  >
                    Administrar Inventario
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default AgregarInventario;