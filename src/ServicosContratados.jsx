import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAvaliacaoVisivel } from './features/servicosSlice'; // ajuste o caminho
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ServicosContratados = () => {
  const servicos = useSelector(state => state.servicosContratados.lista);
  const avaliacoesVisiveis = useSelector(state => state.servicosContratados.avaliacoesVisiveis);
  const dispatch = useDispatch();

  return (
    <div className="container my-4">
      <h2 className="mb-4">Serviços Contratados</h2>
      <div className="row">
        {servicos.map(servico => (
          <div className="col-md-6 col-lg-4 mb-4" key={servico.id}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <i className={`bi bi-${servico.icon} me-2`} style={{ fontSize: '1.5rem' }}></i>
                  <h5 className="card-title mb-0">{servico.nome}</h5>
                </div>
                <h6 className="card-subtitle mb-3 text-muted">{servico.tipo}</h6>
                <p className="card-text mb-1"><strong>Avaliação Geral:</strong> {servico.avaliacaoGeral}</p>
                <p className="card-text"><strong>Data:</strong> {servico.data}</p>
                <button 
                  className="btn btn-primary btn-sm mt-auto"
                  onClick={() => dispatch(toggleAvaliacaoVisivel(servico.id))}
                >
                  {avaliacoesVisiveis[servico.id] ? 'Ocultar Avaliação' : 'Mostrar Avaliação'}
                </button>
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
