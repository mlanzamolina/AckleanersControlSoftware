import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    return (
        <div className="cover">
     
      <h1>Login</h1>
      <button
        id="btn-2"
        onClick={() => {
            navigate("/");
        }}
      >
        Login
      </button>
    </div>
    )
}
