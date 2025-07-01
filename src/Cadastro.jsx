import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registrarNovoUsuario } from "./features/usersSlice";

function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState("cliente");
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    senha: "",
    especialidade: "",
    preco: "",
    descricaoServico: "",
    distanciaAtendimento: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pega o status do slice para mostrar feedback ao usuário (ex: "Carregando...")
  const { status, error } = useSelector((state) => state.users);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispara a thunk com os dados do formulário para a API
      await dispatch(registrarNovoUsuario({ tipoUsuario, dados })).unwrap();

      alert(`Cadastro como ${tipoUsuario} realizado com sucesso!`);
      navigate("/"); // Navega para o login após o sucesso
    } catch (err) {
      // Exibe o erro que veio do back-end ou da thunk
      alert(`Falha no cadastro: ${err}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome Completo</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            value={dados.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={dados.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            name="senha"
            value={dados.senha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de Usuário</label>
          <select
            className="form-select"
            name="tipoUsuario"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            required
          >
            <option value="cliente">Cliente</option>
            <option value="profissional">Profissional</option>
          </select>
        </div>

        {tipoUsuario === "profissional" && (
          <>
            <div className="mb-3">
              <label className="form-label">
                Especialidade (Ex: Faxineira, Encanador)
              </label>
              <input
                type="text"
                className="form-control"
                name="especialidade"
                value={dados.especialidade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preço do Serviço (R$)</label>
              <input
                type="number"
                className="form-control"
                name="preco"
                value={dados.preco}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição do Serviço</label>
              <textarea
                className="form-control"
                name="descricaoServico"
                value={dados.descricaoServico}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Distância de Atendimento (km)
              </label>
              <input
                type="number"
                className="form-control"
                name="distanciaAtendimento"
                value={dados.distanciaAtendimento}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </>
        )}

        <div className="mt-3 text-center">
          Já possui conta? <Link to="/">Entrar</Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Cadastrando..." : "Cadastrar"}
        </button>

        {status === "failed" && (
          <div className="alert alert-danger mt-3">{error}</div>
        )}
      </form>
    </div>
  );
}

export default Cadastro;
