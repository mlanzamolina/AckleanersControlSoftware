import React from 'react'
import "./estiloDocs.css"
import { Interfaz } from '../Employees/empleadoNav'
export const Documentos = () => {
    return (
        <>
            <Interfaz />
            <div className="p-3 estiloPrincipal">
                <div className="container rounded estiloContenedor">
                    <div>
                        <form className="row g-3" >
                            <div class="offset-lg-1 espaciadoContenedor">
                                <button className="rounded botonSize fondoAgregar">Subir Documento</button>
                            </div>

                            <div class="offset-lg-2 espaciadoContenedor">
                                <button className="rounded botonSize fondoDescargar">Bajar Documento</button>
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
        </>
    )
}
