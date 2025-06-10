import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./features/usersSlice";
import "./css/Cadastro.css";

const Cadastro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipo: "cliente",
    foto: "",
  });

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const novosErros = {};
    if (!form.nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (!form.email.includes("@")) novosErros.email = "E-mail inválido";
    if (form.senha.length < 6)
      novosErros.senha = "Senha deve ter no mínimo 6 caracteres";
    if (form.senha !== form.confirmarSenha)
      novosErros.confirmarSenha = "As senhas não coincidem";
    if (form.foto && !form.foto.startsWith("http"))
      novosErros.foto = "URL da imagem inválida";
    return novosErros;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errosValidados = validar();
    if (Object.keys(errosValidados).length > 0) {
      setErros(errosValidados);
      return;
    }

    dispatch(
      addUser({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        tipo: form.tipo,
        foto: form.foto,
      })
    );

    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="cadastro-container">
      <h2>
        Cadastro de {form.tipo === "cliente" ? "Cliente" : "Profissional"}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Campo Nome */}
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
          />
          {erros.nome && <span className="erro">{erros.nome}</span>}
        </label>

        {/* Campo Email */}
        <label>
          E-mail:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />
          {erros.email && <span className="erro">{erros.email}</span>}
        </label>

        {/* Campo Senha */}
        <label>
          Senha:
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
          />
          {erros.senha && <span className="erro">{erros.senha}</span>}
        </label>

        {/* Campo Confirmar Senha */}
        <label>
          Confirmar Senha:
          <input
            type="password"
            name="confirmarSenha"
            value={form.confirmarSenha}
            onChange={handleChange}
            placeholder="Digite a senha novamente"
          />
          {erros.confirmarSenha && (
            <span className="erro">{erros.confirmarSenha}</span>
          )}
        </label>

        {/* Campo Tipo de Usuário */}
        <label>
          Tipo de usuário:
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="cliente">Cliente</option>
            <option value="profissional">Profissional</option>
          </select>
        </label>

        {/* Campo Foto (opcional) */}
        <label>
          URL da foto de perfil (opcional):
          <input
            type="text"
            name="foto"
            value={form.foto}
            onChange={handleChange}
            placeholder="https://exemplo.com/foto.jpg"
          />
          {erros.foto && <span className="erro">{erros.foto}</span>}
        </label>

        <button type="submit">Cadastrar</button>
      </form>

      {/* Pré-visualização da foto (se existir) */}
      {form.foto && form.foto.startsWith("http") && (
        <div className="preview-foto">
          <p>Prévia da Foto:</p>
          <img
            src={form.foto}
            alt="Prévia do perfil"
            style={{ maxWidth: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Cadastro;
