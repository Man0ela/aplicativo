import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./css/style3.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  agendarProfissional,
  cancelarAgendamento,
  enviarFeedbackProfissional,
  selecionarEstrela,
  setDataAgendamento,
  limparNotificacao,
  setHoverEstrela,
  setFeedbackVisivel,
} from './features/profDetalhesSlice';

const Notification = ({ type, message }) => {
  if (!message) return null;
  return (
    <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-danger'}`}>
      {message}
    </div>
  );
};

function ProfissionalDetalhes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profId = Number(id);

  const profissional = useSelector(state =>
    state.profdetalhes.lista.find(p => p.id === profId)
  );

  const {
    datasAgendamento,
    agendados,
    comentarios,
    avaliacoes,
    notaSelecionada, 
    hoverEstrela,
    feedbacksVisiveis,
    notificacao,
  } = useSelector(state => state.profdetalhes);

  const [comentarioLocal, setComentarioLocal] = useState('');

  useEffect(() => {
    if (notificacao) {
      const timer = setTimeout(() => {
        dispatch(limparNotificacao());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notificacao, dispatch]);

  if (!profissional) {
    return <div className="container mt-5" style={{ maxWidth: '700px' }}>Profissional não encontrado.</div>;
  }

  const handleConfirmar = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataSelecionada = new Date(datasAgendamento[profId]);
    if (!datasAgendamento[profId]) {
      dispatch(limparNotificacao());
      return dispatch(setNotificacao({ tipo: 'erro', mensagem: 'Selecione uma data.' }));
    }
    if (dataSelecionada < hoje) {
      return dispatch(setNotificacao({ tipo: 'erro', mensagem: 'Data inválida.' }));
    }
    dispatch(agendarProfissional({ id: profId, data: datasAgendamento[profId] }));
  };

  const handleCancelar = () => {
    dispatch(cancelarAgendamento(profId));
  };

  const handleEnviarFeedback = () => {
    if (!agendados[profId]) {
    return dispatch(setNotificacao({ tipo: 'erro', mensagem: 'Agende um horário antes de enviar feedback.' }));
    }
    
      if (comentarioLocal.trim() === '' || !notaSelecionada[profId]) {
    return dispatch(setNotificacao({ tipo: 'erro', mensagem: 'Preencha comentário e nota.' }));
      }
    dispatch(enviarFeedbackProfissional({ id: profId, comentario: comentarioLocal }));
    setComentarioLocal('');
  };

  const dataMinima = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  return (
    <div className={`container mt-5 ${styles["perfil-container"]}`} style={{ maxWidth: '700px' }}>
      <h2 className={styles["titulo-profissional"]}>{profissional.nome}</h2>
      <h4 className={styles["subtitulo"]}>{profissional.tipo}</h4>
      <div className="mb-3">
        {'★'.repeat(profissional.estrelas)}{'☆'.repeat(5 - profissional.estrelas)}
      </div>
      <p>{profissional.descricao}</p>
      <p><strong>Preço:</strong> R$ {profissional.preco.toFixed(2)}</p>
      <p><strong>Distância:</strong> {profissional.distancia} km</p>

      <Notification type={notificacao?.tipo} message={notificacao?.mensagem} />

      <div className="mt-4">
        <h5>Agendamento</h5>
        {!agendados[profId] ? (
          <div>
            <input
              type="date"
              min={dataMinima()}
              className="form-control my-2"
              value={datasAgendamento[profId] || ''}
              onChange={(e) => dispatch(setDataAgendamento({ id: profId, data: e.target.value }))}
            />
            <button className="btn btn-success" onClick={handleConfirmar}>Confirmar Agendamento</button>
          </div>
        ) : (
          <div>
            <p>Agendado para: {datasAgendamento[profId]}</p>
            <button className="btn btn-danger" onClick={handleCancelar}>Cancelar Agendamento</button>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h5>Feedback</h5>
        <textarea
          className="form-control my-2"
          value={comentarioLocal}
          onChange={(e) => setComentarioLocal(e.target.value)}
          placeholder="Escreva seu comentário..."
        />
        <div className="mb-2">
          {[1, 2, 3, 4, 5].map(num => (
            <span
              key={num}
              onMouseEnter={() => dispatch(setHoverEstrela({ id: profId, rating: num }))}
              onMouseLeave={() => dispatch(setHoverEstrela({ id: profId, rating: 0 }))}
              onClick={() => dispatch(selecionarEstrela({ id: profId, rating: num}))}
              style={{
                color: num <= (hoverEstrela[profId] || notaSelecionada[profId] || 0) ? 'gold' : 'gray',
                cursor: 'pointer',
                fontSize: '1.5rem'
              }}
            >
              ★
            </span>
          ))}
        </div>
        <button className="btn btn-primary" onClick={handleEnviarFeedback}>Enviar Feedback</button>
      </div>

      <div className="mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => dispatch(setFeedbackVisivel({ id: profId}))}
        >
          {feedbacksVisiveis[profId] ? 'Ocultar Feedbacks' : 'Mostrar Feedbacks'}
        </button>
      </div>

      {feedbacksVisiveis[profId] && comentarios[profId] && (
      <div className="mt-4">
      <h6>Comentários:</h6>
      {comentarios[profId].map((com, index) => (
      <div key={index} className="border p-3 rounded mb-2 bg-light">
        <div>{'★'.repeat(avaliacoes[profId])}{'☆'.repeat(5 - avaliacoes[profId])}</div>
        <p className="mb-0">{com}</p>
      </div>
      ))}
      </div>
      )}
    </div>
  );
}

export default ProfissionalDetalhes;