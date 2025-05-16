import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ServicosContratados = () => {
  // Dados internos dos serviços contratados
  const servicos = [
    {
      id: 1,
      icon: 'tools',
      nome: 'Manutenção do Site',
      tipo: 'Web',
      avaliacaoGeral: '4.8',
      data: '10/04/2025',
      avaliacao: 'Serviço excelente, muito profissional e rápido. Recomendo!'
    },
    {
      id: 2,
      icon: 'phone',
      nome: 'Suporte Técnico',
      tipo: 'TI',
      avaliacaoGeral: '4.5',
      data: '22/03/2025',
      avaliacao: 'Ajuda muito rápida e eficiente, resolveram todos os meus problemas.'
    },
    {
      id: 3,
      icon: 'laptop',
      nome: 'Desenvolvimento de Aplicativo',
      tipo: 'Desenvolvimento',
      avaliacaoGeral: '4.9',
      data: '15/02/2025',
      avaliacao: 'O aplicativo ficou ótimo e o desenvolvedor manteve ótima comunicação.'
    }
  ];

  // Estado para controlar visibilidade das avaliações
  const [avaliacoesVisiveis, setAvaliacoesVisiveis] = useState({});

  // Função para alternar visibilidade de uma avaliação pelo ID do serviço
  const toggleAvaliacao = (id) => {
    setAvaliacoesVisiveis(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Serviços Contratados</h2>
      <div className="row">
        {servicos.map(servico => (
          <div className="col-md-6 col-lg-4 mb-4" key={servico.id}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                {/* Ícone e Nome */}
                <div className="d-flex align-items-center mb-2">
                  <i className={`bi bi-${servico.icon} me-2`} style={{ fontSize: '1.5rem' }}></i>
                  <h5 className="card-title mb-0">{servico.nome}</h5>
                </div>
                {/* Tipo de serviço */}
                <h6 className="card-subtitle mb-3 text-muted">{servico.tipo}</h6>
                {/* Avaliação geral e data */}
                <p className="card-text mb-1"><strong>Avaliação Geral:</strong> {servico.avaliacaoGeral}</p>
                <p className="card-text"><strong>Data:</strong> {servico.data}</p>
                {/* Botão para mostrar/ocultar avaliação */}
                <button 
                  className="btn btn-primary btn-sm mt-auto"
                  onClick={() => toggleAvaliacao(servico.id)}
                >
                  {avaliacoesVisiveis[servico.id] ? 'Ocultar Avaliação' : 'Mostrar Avaliação'}
                </button>
                {/* Avaliação detalhada */}
                {avaliacoesVisiveis[servico.id] && (
                  <div className="mt-3 alert alert-secondary p-2">
                    <strong>Avaliação:</strong> {servico.avaliacao}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicosContratados;
