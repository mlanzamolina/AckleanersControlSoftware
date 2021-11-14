import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pizeria() {
    const navigate = useNavigate();
  return (
    <div className="cover">
      <h1>Home</h1>
      <button
        id="btn-3"
        onClick={() => navigate('../Login', { replace: true })}>
        Home
      </button>
    </div>
  );
}
