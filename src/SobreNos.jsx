import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/SobreNos.module.css';

const SobreNos = () => {
  const navigate = useNavigate();
  const { titulo, descricao, itens } = useSelector(state => state.sobreNos);

  return (
    <div className={`container py-5 ${styles.sobreContainer}`}>
      <h1 className="mb-4 text-center fw-bold">{titulo}</h1>
      <p className="lead text-center mb-5">{descricao}</p>

      <div className="row gy-4">
        {(itens || []).map(item => (
          <div key={item.id} className="col-md-4 text-center">
            <i className={`bi bi-${item.icon} fs-1 mb-3 ${styles.icon}`} />
            <h3 className="mb-2">{item.titulo}</h3>
            <p>{item.texto}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/buscar')}
        >
          Encontre um profissional agora
        </button>
      </div>
    </div>
  );
};

export default SobreNos;
