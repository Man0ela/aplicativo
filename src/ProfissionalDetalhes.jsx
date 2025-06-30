import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfissionalById } from "./features/profDetalhesSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProfissionalDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const { profissional, status, error } = useSelector(
    (state) => state.profdetalhes
  );

  useEffect(() => {
    // Busca os dados do profissional se o ID da URL mudar
    if (id) {
      dispatch(fetchProfissionalById(id));
    }
  }, [id, dispatch]);

  // --- Renderização de Status ---
  if (status === "loading") {
    return (
      <div className="container mt-5 text-center">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          Erro: {error || "Profissional não encontrado."}
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Voltar
        </button>
      </div>
    );
  }

  if (!profissional) {
    return null; 
  }

 
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-sm"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <div className="card-header bg-primary text-white">
          <h2 className="card-title mb-0">{profissional.nome}</h2>
          <p className="card-subtitle mb-0">{profissional.tipo}</p>
        </div>
        <div className="card-body">
          <div className="mb-3 d-flex align-items-center">
            <div className="text-warning me-2" style={{ fontSize: "1.2rem" }}>
              {"★".repeat(Math.round(profissional.estrelas))}
              {"☆".repeat(5 - Math.round(profissional.estrelas))}
            </div>
            <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">
              {profissional.estrelas.toFixed(1)} de avaliação
            </span>
          </div>

          <p className="card-text">{profissional.descricao}</p>

          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Preço base do serviço:
              <span className="fw-bold">
                R$ {profissional.preco.toFixed(2)}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Distância aproximada:
              <span className="fw-bold">{profissional.distancia} km</span>
            </li>
          </ul>

          <div className="card-footer text-center bg-white border-top-0 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-arrow-left me-2"></i>Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfissionalDetalhes;
