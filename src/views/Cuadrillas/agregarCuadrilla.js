import React from 'react'
import { useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../components/firebase";
import "./estiloCuadrillas.css";
import { Link } from "react-router-dom";
import Nav from "../NavAdmin";
export const AgregarCuadrilla = () => {
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (user === null) window.location.assign("/Login");
    }, [user, loading]);

    return (
        <>
            <Nav />
            <h1
                style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "1%",
                    marginBottom: "20px",
                    borderBottom: "2px solid black",
                    fontSize: "40px",
                    color: "red"
                }}
            >Agregar cuadrilla, falta funcionalidad y estilo</h1>
        </>
    )
}
