import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!tipoUsuario) {
      alert("Selecione um tipo de usuário");
      return;
    }

    if (tipoUsuario === "cliente") {
      navigate("/inicial");
    } else if (tipoUsuario === "profissional") {
      navigate("/dashboard-profissional");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>

      <div className="mb-3">
        <label className="form-label">Tipo de Usuário</label>
        <select
          className="form-select"
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="cliente">Cliente</option>
          <option value="profissional">Profissional</option>
        </select>
      </div>

      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Acessar
      </button>

      <div className="mt-3 text-center">
        Não tem conta? <a href="/cadastro">Cadastre-se</a>
      </div>
    </div>
  );
}

export default Login;
