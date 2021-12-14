import React from 'react'
import "./estiloDocs.css"
import { Link } from "react-router-dom";
import Nav from "../NavAdmin"
export const Documentos = () => {
    return (
        <>
            <Nav></Nav>
            <div
          className="contenedorPrincipal2"
          style={{ width: "100%", height: "100%" }}
        >
            <div className="p-3 estiloPrincipal">
                <div className="container rounded estiloContenedor">
                    <div>
                        <form className="row g-3" >
                            <div class="offset-lg-1 espaciadoContenedor">
                                <Link to="/AgregarDocumento">
                                <button className="rounded botonSize fondoAgregar">Subir Documento</button>
                                </Link>
                            </div>

                            <div class="offset-lg-2 espaciadoContenedor">
                                <Link to="/DescargarDocumento">
                                <button className="rounded botonSize fondoDescargar">Bajar Documento</button>
                                </Link>
                            </div>

                            <div class="offset-lg-1 espaciadoContenedor">
                                <button className="rounded botonSize fondoEliminar">Eliminar Documento</button>
                            </div>
                            <div class="offset-lg-2 espaciadoContenedor">
                                <button className="rounded botonSize fondoActualizar">Actualizar Documento</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            </div>
           
        </>
    )
}
