import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { selectAllProfissionais, fetchProfissionais } from "./features/buscaSlice";
import cx from "classnames";
import styles from "./css/style3.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  agendarProfissional,
  cancelarAgendamento,
  enviarFeedbackProfissional,
  selecionarEstrela,
  setDataAgendamento,
  limparNotificacao,
  setFeedbackVisivel,
} from "./features/profsFiltradosSlice";

const ProfsFiltrados = () => {
  const [searchParams] = useSearchParams();
  const tipoSelecionado = searchParams.get("tipo");
  const dispatch = useDispatch();

  const status = useSelector((state) => state.busca.status);
  const error = useSelector((state) => state.busca.error);
  const profissionais = useSelector(selectAllProfissionais);

  const {
    agendados,
    avaliacoes,
    datasAgendamento,
    comentarios,
    feedbacksVisiveis,
    notificacao,
    hoverEstrela,
  } = useSelector((state) => state.profissionais);

  useEffect(() => {
    if (tipoSelecionado) {
      dispatch(fetchProfissionais());
    }
  }, [dispatch, tipoSelecionado]);

  useEffect(() => {
    if (notificacao) {
      const timer = setTimeout(() => {
        dispatch(limparNotificacao());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notificacao, dispatch]);

  const getDataMinima = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const Notificacao = () => {
    if (!notificacao) return null;
    return (
      <div
        className={cx(styles.notificacao, {
          [styles.sucesso]: notificacao.tipo === "sucesso",
          [styles.erro]: notificacao.tipo === "erro",
        })}
      >
        {notificacao.mensagem}
        <button
          className={styles.fecharNotificacao}
          onClick={() => dispatch(limparNotificacao())}
        >
          ×
        </button>
      </div>
    );
  };

  const EstrelasAvaliacao = ({ profId }) => (
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

  if (status === "loading") return <p>Carregando profissionais...</p>;
  if (error) return <p>Erro ao carregar: {error}</p>;

  return (
    <div className={styles.container2}>
      <Notificacao />
      <h1>Profissionais de {tipoSelecionado}</h1>
      {profissionais.map((prof) => (
        <div key={prof.id} className="profissional">
          <h2>
            <Link to={`/profissional/${prof.id}`} className={styles.nomeProfissional}>
              {prof.nome}
            </Link>
          </h2>

          <div className={styles.avaliacaoEstrelas}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={cx(styles.estrela, {
                  [styles.selecionada]: i <= Math.round(prof.estrelas),
                })}
              >
                ★
              </span>
            ))}
            <span>({prof.estrelas.toFixed(1)})</span>
          </div>

          <div>
            <input
              type="date"
              min={getDataMinima()}
              value={datasAgendamento[prof.id] || ""}
              onChange={(e) => dispatch(setDataAgendamento({ id: prof.id, data: e.target.value }))}
            />
          </div>

          <div>
            <button className={styles.agendar} onClick={() => dispatch(agendarProfissional(prof.id))}>
              Agendar
            </button>
            <button
              className={styles.cancelar}
              onClick={() => dispatch(cancelarAgendamento(prof.id))}
              disabled={!agendados[prof.id]}
            >
              Cancelar
            </button>
          </div>

          {feedbacksVisiveis[prof.id] && (
            <div className={styles["feedback-area"]}>
              <textarea
                value={comentarios[prof.id] || ""}
                onChange={(e) =>
                  dispatch(
                    enviarFeedbackProfissional({
                      id: prof.id,
                      comentario: e.target.value,
                      somenteTexto: true,
                    })
                  )
                }
                rows={3}
                cols={40}
                placeholder="Deixe seu comentário"
              />
              <EstrelasAvaliacao profId={prof.id} />
              <button
                className={styles.feedbackButton}
                onClick={() => dispatch(enviarFeedbackProfissional({ id: prof.id }))}
              >
                Enviar Feedback
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfsFiltrados;
