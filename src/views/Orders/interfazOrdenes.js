import React from 'react';
import "./estiloOrdenes.css"
import { Link } from 'react-router-dom';
import Nav from "../NavAdmin"
export const IOrdenes = () => {
    return (
        <>
            <Nav></Nav>
            <div
                className="contenedorPrincipal2"
                style={{ width: "100%", height: "100%" }}
            >
                <a className="navbar-brand" style={{ margin: "0px 10px" }} href="/adminOrders">Ordenes de Trabajo</a>
                <div className="p-3 estiloPrincipal">
                    <div className="container rounded estiloContenedor">
                        <div>
                            <form className="row g-3">
                                <div class="offset-lg-4" style={{paddingLeft:"6%"}}>
                                    <Link to="/AgregarOrden">
                                        <button className="rounded botonSize fondoAgregarOrden">
                                            Agregar Orden de Trabajo
                                        </button>
                                    </Link>
                                </div>

                                <div class="offset-lg-1 espaciadoContenedor" style={{paddingLeft:"5%", paddingRight:"25%",  marginTop:"10%"}}>
                                    <Link to="/ListarOrdenes">
                                        <button className="rounded botonSize fondoListarOrden">
                                            Listar Ordenes de Trabajo
                                        </button>
                                    </Link>
                                </div>

                                <div class="offset-lg-1 espaciadoContenedor" style={{paddingLeft:"3%", marginTop:"10%"}}>
                                    <Link to="/ModificarOrden">
                                    <button className="rounded botonSize fondoModificarOrden">
                                        Modificar Ordenes de Trabajo
                                    </button>
                                    </Link>
                                    
                                </div>   
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};