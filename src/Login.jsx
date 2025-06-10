import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const usuarios = useSelector((state) => state.users);

  const handleLogin = () => {
    if (!email || !senha) {
      setErro("Email e senha são obrigatórios");
      return;
    } else {
      navigate("/inicial");
    }

    const usuario = usuarios.find(
      (user) =>
        user.email === email &&
        user.senha === senha &&
        user.tipo === tipoUsuario
    );

    if (usuario) {
      if (tipoUsuario === "cliente") {
        navigate("/inicial");
      } else if (tipoUsuario === "profissional") {
        navigate("/dashboard-profissional");
      }
    } else {
      setErro("Credenciais inválidas ou usuário não encontrado");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErro("");
          }}
          placeholder="Digite seu email"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Senha</label>
        <input
          type="password"
          className="form-control"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErro("");
          }}
          placeholder="Digite sua senha"
        />
      </div>

      {erro && <div className="alert alert-danger">{erro}</div>}

      <button className="btn btn-primary w-100" onClick={handleLogin} onclick>
        Entrar
      </button>

      <div className="mt-3 text-center">
        Não tem conta? <a href="/cadastro">Cadastre-se</a>
      </div>
    </div>
  );
}

export default Login;
