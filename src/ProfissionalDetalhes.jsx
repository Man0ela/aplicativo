import React from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/style1.module.css";// Garanta que esse arquivo exista e esteja estilizando como seu HTML original

const profissionais = [
  {
    id: 1,
    nome: "João - Piscineiro",
    tipo: "Piscineiro",
    estrelas: 4.2,
    descricao:
      "João é um especialista em manutenção de piscinas, com mais de 10 anos de experiência no setor. Ele realiza limpeza, reparos e manutenção geral de piscinas em residências e comércios. Preço médio: R$ 150,00 por visita. João atende em um raio de até 30 km a partir da sua localização.",
    preco: 150,
    distanciaMaxima: 30,
  },
  {
    id: 2,
    nome: "Maria - Faxineira",
    tipo: "Faxineira",
    estrelas: 4.8,
    descricao:
      "Maria oferece serviços completos de limpeza, incluindo faxina profunda e organização. É conhecida por sua atenção aos detalhes e pontualidade. Preço médio: R$ 120,00 por serviço. Maria atende em um raio de até 15 km.",
    preco: 120,
    distanciaMaxima: 15,
  },
  {
    id: 3,
    nome: "Carlos - Jardineiro",
    tipo: "Jardineiro",
    estrelas: 3.9,
    descricao:
      "Carlos realiza podas, plantio e manutenção de jardins, trabalhando com projetos paisagísticos e pequenos reparos. Preço médio: R$ 100,00. Atende em até 25 km.",
    preco: 100,
    distanciaMaxima: 25,
  },
  {
    id: 4,
    nome: "Ana - Faxineiro",
    tipo: "Faxineira",
    estrelas: 4.5,
    descricao:
      "Ana realiza serviços de limpeza residencial e comercial com foco em agilidade e eficiência. Ela oferece também serviços adicionais como passar roupa e organização de ambientes. Preço médio: R$ 110,00 por visita. Ana atende em um raio de até 20 km.",
    preco: 110,
    distanciaMaxima: 20,
  },
  {
    id: 5,
    nome: "Pedro - Jardineiro",
    tipo: "Jardineiro",
    estrelas: 4.7,
    descricao:
      "Pedro é um jardineiro experiente que atua com manutenção geral de áreas verdes, irrigação, adubagem e controle de pragas. Muito requisitado por condomínios e residências de alto padrão. Preço médio: R$ 130,00 por serviço. Atende até 40 km de distância.",
    preco: 130,
    distanciaMaxima: 40,
  },
];

function ProfissionalDetalhes() {
  const { id } = useParams();
  const profissional = profissionais.find((p) => p.id === parseInt(id));

  if (!profissional)
    return <p className="text-center mt-5">Profissional não encontrado.</p>;

  return (
    <>
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Getservices</span>
        </a>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="#" className="nav-link active">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Segurança
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Entre como profissional
            </a>
          </li>
        </ul>
      </header>

      <div className="container2 text-center">
        <h1 className="mb-4">Detalhes do Prestador de Serviço</h1>
        <div className="card mx-auto shadow-sm" style={{ maxWidth: "600px" }}>
          <div className="card-body text-start">
            <h3 className="card-title text-primary">{profissional.nome}</h3>
            <p className="card-text">{profissional.descricao}</p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">
                <strong>Tipo de serviço:</strong> {profissional.tipo}
              </li>
              <li className="list-group-item">
                <strong>Preço médio:</strong> R$ {profissional.preco},00
              </li>
              <li className="list-group-item">
                <strong>Distância máxima de atendimento:</strong>{" "}
                {profissional.distanciaMaxima} km
              </li>
              <li className="list-group-item">
                <strong>Avaliação:</strong>{" "}
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={
                      i <= Math.round(profissional.estrelas)
                        ? "text-warning"
                        : "text-secondary"
                    }
                  >
                    &#9733;
                  </span>
                ))}
              </li>
            </ul>
            <a href="/servicos-contratados" className="btn btn-success w-100">
              Agendar Serviço
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfissionalDetalhes;
