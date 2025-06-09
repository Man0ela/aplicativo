import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { selectAllProfissionais, fetchProfissionais } from "./features/buscaSlice"; // Importado do buscaSlice
import {
  agendarProfissional,
  cancelarAgendamento,
  enviarFeedbackProfissional,
  selecionarEstrela,
  setDataAgendamento,
  limparNotificacao,
  setFeedbackVisivel,
} from "./features/profsFiltradosSlice";
import cx from "classnames";
import styles from "./css/style3.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { contratarServico } from './features/servicosSlice';

// Componentes internos podem ser mantidos como no seu código original
const Notificacao = ({ notificacao, onClear }) => {
  if (!notificacao) return null;
  return (
    <div className={cx(styles.notificacao, styles[notificacao.tipo])}>
      {notificacao.mensagem}
      <button className={styles.fecharNotificacao} onClick={onClear}>×</button>
    </div>
  );
};

const EstrelasAvaliacao = ({ profId, dispatch, hoverEstrela, avaliacoes }) => (
    <div className={styles.avaliacaoEstrelas}>
        {[1, 2, 3, 4, 5].map((i) => (
            <span
                key={i}
                className={cx(styles.estrela, {
                    [styles.hover]: i <= (hoverEstrela[profId] || 0),
                    [styles.selecionada]: i <= (avaliacoes[profId] || 0),
                })}
                onMouseEnter={() => dispatch(selecionarEstrela({ id: profId, rating: i, hover: true }))}
                onMouseLeave={() => dispatch(selecionarEstrela({ id: profId, rating: 0, hover: true }))}
                onClick={() => dispatch(selecionarEstrela({ id: profId, rating: i }))}
            >
                ★
            </span>
        ))}
    </div>
);

const ProfsFiltrados = () => {
  const [searchParams] = useSearchParams();
  const tipoSelecionado = searchParams.get("tipo");
  const dispatch = useDispatch();

  const status = useSelector((state) => state.busca.status);
  const error = useSelector((state) => state.busca.error);
  const profissionais = useSelector(selectAllProfissionais);
  
  // Seletores do estado de interações (agendamento, feedback, etc.)
  const { agendados, avaliacoes, datasAgendamento, comentarios, feedbacksVisiveis, notificacao, hoverEstrela } 
  = useSelector((state) => state.profissionais);

  useEffect(() => {
    // Sempre que o 'tipoSelecionado' da URL existir, 
    // disparamos a busca. Isso torna o componente autossuficiente.
    // Removemos a dependência do `status`.
    if (tipoSelecionado) {
      dispatch(fetchProfissionais(tipoSelecionado));
    }
    // A dependência agora é apenas no 'tipoSelecionado' e no 'dispatch'.
  }, [tipoSelecionado, dispatch]);

  useEffect(() => {
    if (notificacao) {
      const timer = setTimeout(() => dispatch(limparNotificacao()), 2000); // Aumentei o tempo
      return () => clearTimeout(timer);
    }
  }, [notificacao, dispatch]);

  const getDataMinima = () => new Date().toISOString().split("T")[0];
  
  if (status === "loading") return <p className="text-center mt-5">Carregando profissionais...</p>;
  if (status === "failed") return <p className="text-center mt-5 alert alert-danger">Erro: {error}</p>;
  if (status !== "succeeded" || profissionais.length === 0) {
      return (
        <div className="text-center mt-5">
            <h1>Nenhum profissional encontrado</h1>
            <p>Tente buscar por outro termo.</p>
            <Link to="/buscar" className="btn btn-primary">Voltar para a Busca</Link>
        </div>
      )
  }

  return (
    <div className={styles.container2}>
      <Notificacao notificacao={notificacao} onClear={() => dispatch(limparNotificacao())} />
      <h1 className="mb-4">Profissionais de {tipoSelecionado}</h1>
      
      {profissionais.map((prof) => (
        <div key={prof.id} className={`card mb-4 ${styles.profissionalCard}`}>
          <div className="card-body">
            <h2 className="card-title">
              <Link to={`/profissional/${prof.id}`} className={styles.nomeProfissional}>
                {prof.nome}
              </Link>
            </h2>
            <p className="card-text text-muted">{prof.descricao}</p>
            <div className="d-flex justify-content-between mb-2">
              <strong>Preço: R$ {prof.preco?.toFixed(2)}</strong>
              <span>Distância: {prof.distancia} km</span>
            </div>

            <div className="d-flex align-items-center mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={cx(styles.estrela, { [styles.selecionada]: i <= Math.round(prof.estrelas) })}>★</span>
              ))}
              <span className="ms-2">({prof.estrelas?.toFixed(1)})</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={cx(styles.estrela, { [styles.selecionada]: i <= Math.round(prof.estrelas) })}>★</span>
              ))}
              <span className="ms-2">({prof.estrelas.toFixed(1)})</span>
            </div>

            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
              <input
                type="date"
                className="form-control"
                style={{width: 'auto'}}
                min={getDataMinima()}
                value={datasAgendamento[prof.id] || ""}
                onChange={(e) => dispatch(setDataAgendamento({ id: prof.id, data: e.target.value }))}
              />
             <button 
                 className="btn btn-success" 
                  onClick={() => {
               const dataAgendamento = datasAgendamento[prof.id];
              if (dataAgendamento) {
               dispatch(contratarServico({ profissional: prof, dataAgendamento }));
               // Você pode querer desabilitar o botão aqui ou mostrar uma mensagem
                } else {
                   alert('Por favor, selecione uma data para o agendamento.');
                 }}}>
                Agendar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(cancelarAgendamento(prof.id))}
                disabled={!agendados[prof.id]}
              >
                Cancelar
              </button>
            </div>
            
            {agendados[prof.id] && (
               <button className="btn btn-outline-primary btn-sm mb-3" onClick={() => dispatch(setFeedbackVisivel({ id: prof.id, visivel: !feedbacksVisiveis[prof.id] }))}>
                 {feedbacksVisiveis[prof.id] ? 'Ocultar Feedback' : 'Deixar um Feedback'}
               </button>
            )}

            {agendados[prof.id] && feedbacksVisiveis[prof.id] && (
              <div className={styles["feedback-area"]}>
                <EstrelasAvaliacao profId={prof.id} dispatch={dispatch} hoverEstrela={hoverEstrela} avaliacoes={avaliacoes}/>
                <textarea
                  className="form-control mt-2"
                  value={comentarios[prof.id] || ""}
                  onChange={(e) => dispatch(enviarFeedbackProfissional({ id: prof.id, comentario: e.target.value, somenteTexto: true }))}
                  rows={3}
                  placeholder="Deixe seu comentário"
                />
                <button
                  className={`btn btn-primary mt-2 ${styles.feedbackButton}`}
                  onClick={() => dispatch(enviarFeedbackProfissional({ id: prof.id }))}
                >
                  Enviar Feedback
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfsFiltrados;