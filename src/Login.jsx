import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./features/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia só email e senha, sem tipoUsuario
      const userData = await dispatch(loginUser({ email, senha })).unwrap();
      console.log('DADOS RECEBIDOS DO BACK-END:', userData);

      // Redireciona conforme o tipo retornado pelo backend
      if (userData.user.tipo === "cliente") {
        navigate("/inicial");
      } else if (userData.user.tipo === "profissional") {
        navigate("/dashboard-profissional");
      }
    } catch (err) {
      alert(`Falha no login: ${err}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Entrando..." : "Acessar"}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>

      <div className="mt-3 text-center">
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </div>
    </div>
  );
}

export default Login;
