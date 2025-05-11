import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importando Link para redirecionar
import { useSearchParams } from "react-router-dom";
import "./style1.css";

const profissionais = [
  {
    id: 1,
    nome: "João - Piscineiro",
    tipo: "Piscineiro",
    estrelas: 4.2,
    descricao: "João é especialista em manutenção de piscinas.",
  },
  {
    id: 2,
    nome: "Maria - Faxineira",
    tipo: "Faxineira",
    estrelas: 4.8,
    descricao: "Maria realiza serviços de limpeza residencial e comercial.",
  },
  {
    id: 3,
    nome: "Carlos - Jardineiro",
    tipo: "Jardineiro",
    estrelas: 3.9,
    descricao: "Carlos cuida de jardins e áreas verdes.",
  },
  {
    id: 4,
    nome: "Ana - Faxineira",
    tipo: "Faxineira",
    estrelas: 4.6,
    descricao: "Ana oferece serviços de faxina profunda e especializada.",
  },
  {
    id: 5,
    nome: "Pedro - Jardineiro",
    tipo: "Jardineiro",
    estrelas: 4.1,
    descricao: "Pedro é especialista em jardinagem e paisagismo.",
  },
];

export default function ProfsFiltrados() {
  const [searchParams] = useSearchParams();
  const tipoSelecionado = searchParams.get("tipo");
  const [agendados, setAgendados] = useState({});
  const [avaliacoes, setAvaliacoes] = useState({});
  const [feedbacksVisiveis, setFeedbacksVisiveis] = useState({});

  const filtrados = profissionais.filter((p) => p.tipo === tipoSelecionado);

  // Função para garantir que a data não seja anterior à data de hoje
  const getDataMinima = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const agendar = (id, data) => {
    const dataEscolhida = new Date(data);
    if (!data) {
      alert("Por favor, selecione uma data.");
    } else if (dataEscolhida < new Date()) {
      alert("Não é possível agendar para uma data passada.");
    } else {
      setAgendados((prev) => ({ ...prev, [id]: true }));
      setFeedbacksVisiveis((prev) => ({ ...prev, [id]: true }));
      alert(`Agendado com sucesso para ID: ${id} na data: ${data}`);
    }
  };

  const cancelar = (id) => {
    setAgendados((prev) => {
      const novo = { ...prev };
      delete novo[id];
      return novo;
    });
    setFeedbacksVisiveis((prev) => ({ ...prev, [id]: false }));
    alert(`Agendamento cancelado para ID: ${id}`);
  };

  const selecionarEstrela = (id, nota) => {
    setAvaliacoes((prev) => ({ ...prev, [id]: nota }));
  };

  const enviarFeedback = (id, texto) => {
    const nota = avaliacoes[id] || 0;
    if (!texto) {
      alert("Escreva seu comentário.");
    } else if (nota === 0) {
      alert("Selecione uma nota de 1 a 5 estrelas.");
    } else {
      alert(
        `Feedback enviado!\nComentário: ${texto}\nNota: ${nota} estrela(s)`
      );
    }
  };

  return (
    <div className="container2">
      <h1 id="titulo">Profissionais de {tipoSelecionado}</h1>
      {filtrados.map((prof) => (
        <div key={prof.id} className="profissional">
          {/* Nome do profissional como link */}
          <h2>
            <Link to={`/profissional/${prof.id}`} className="link-profissional">
              {prof.nome}
            </Link>
          </h2>

          <div className="estrelas">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={i <= Math.round(prof.estrelas) ? "checked" : ""}
              >
                &#9733;
              </span>
            ))}
          </div>

          {/* Seção de agendamento */}
          <div className="data-agendamento">
            <label>
              Selecione uma data:{" "}
              <input
                type="date"
                min={getDataMinima()} // Impedindo a seleção de datas passadas
                id={`data-${prof.id}`}
              />
            </label>
          </div>
          <div className="botoes">
            <button
              className="agendar"
              onClick={() => {
                const data = document.getElementById(`data-${prof.id}`).value;
                agendar(prof.id, data);
              }}
            >
              Agendar
            </button>
            <button
              className="cancelar"
              disabled={!agendados[prof.id]}
              onClick={() => cancelar(prof.id)}
            >
              Cancelar
            </button>
          </div>

          {/* Feedback */}
          {feedbacksVisiveis[prof.id] && (
            <div className="feedback-area">
              <textarea
                rows="3"
                cols="40"
                placeholder="Deixe seu comentário"
                id={`comentario-${prof.id}`}
              ></textarea>
              <div className="avaliacao-estrelas">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    onClick={() => selecionarEstrela(prof.id, i)}
                    className={avaliacoes[prof.id] >= i ? "selecionada" : ""}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  const texto = document
                    .getElementById(`comentario-${prof.id}`)
                    .value.trim();
                  enviarFeedback(prof.id, texto);
                  document.getElementById(`comentario-${prof.id}`).value = "";
                }}
              >
                Enviar Feedback
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
