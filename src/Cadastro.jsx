import React, { useState } from "react";

function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState("cliente");
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    senha: "",
    // Campos específicos para profissionais
    especialidade: "",
    preco: "",
    descricaoServico: "",
    distanciaAtendimento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você enviaria os dados para o backend
    console.log("Dados enviados:", dados);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Cadastro</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos básicos para todos os usuários */}
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

        {/* Campos condicionais para profissionais */}
        {tipoUsuario === "profissional" && (
          <>
            <div className="mb-3">
              <label className="form-label">Especialidade</label>
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

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
