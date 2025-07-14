import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

// Imports dos Slices
import {
  selectAllProfissionais,
  fetchProfissionais,
} from "./features/buscaSlice";
import {
  contratarServico,
  fetchServicos,
  selectAllServicos,
  cancelarServico,
} from "./features/servicosSlice";

// Estilos
import styles from "./css/style3.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProfsFiltrados = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const tipoSelecionado = searchParams.get("tipo");

  const [datasAgendamento, setDatasAgendamento] = useState({});

  // --- Seletores do Redux ---
  const { user } = useSelector((state) => state.auth);
  console.log("user do Redux:", user); // 👈 Console log adicionado aqui
  const statusBusca = useSelector((state) => state.busca.status);
  const errorBusca = useSelector((state) => state.busca.error);
  const profissionais = useSelector(selectAllProfissionais);
  const servicosContratados = useSelector(selectAllServicos);

  const {
    type,
    profissionalId: agendandoProfId,
    status: agendamentoStatus,
  } = useSelector((state) => state.servicosContratados.actionStatus);

  useEffect(() => {
    if (tipoSelecionado) {
      dispatch(fetchProfissionais(tipoSelecionado));
    }
    if (user) {
      dispatch(fetchServicos());
    }
  }, [tipoSelecionado, user, dispatch]);

  const handleDateChange = (profId, data) => {
    setDatasAgendamento((prevDatas) => ({ ...prevDatas, [profId]: data }));
  };

  const getDataMinima = () => new Date().toISOString().split("T")[0];

  const agendamentosMap = useMemo(() => {
    const map = new Map();
    servicosContratados.forEach((servico) => {
      if (!servico.avaliacao) {
        map.set(servico.profissionalId, servico);
      }
    });
    return map;
  }, [servicosContratados]);

  let content;

  if (statusBusca === "loading") {
    content = <p className="text-center mt-5">Carregando profissionais...</p>;
  } else if (statusBusca === "failed") {
    content = (
      <p className="text-center mt-5 alert alert-danger">
        Erro ao buscar: {errorBusca}
      </p>
    );
  } else if (statusBusca === "succeeded") {
    if (profissionais && profissionais.length > 0) {
      content = profissionais.map((prof) => {
        if (!prof || !prof.id) return null;

        const agendamentoExistente = agendamentosMap.get(prof.id);
        const isAgendando =
          type === "contratar" &&
          agendamentoStatus === "loading" &&
          agendandoProfId === prof.id;

        return (
          <div key={prof.id} className={`card mb-4 ${styles.profissionalCard}`}>
            <div className="card-body">
              <h2 className="card-title">
                <span
                  to={`/profissionais/${prof.id}`}
                  className={styles.nomeProfissional}
                >
                  {prof.nome}
                </span>
              </h2>
              <p className="card-text text-muted">{prof.descricao}</p>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">
                  Distância: {prof.distanciaMaxima} km
                </span>
                <span className="fs-5 fw-bold text-success">
                  R$ {prof.valorPorHora?.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <div className="d-flex flex-wrap gap-2 align-items-center mt-3 p-3 border rounded bg-light">
                {agendamentoExistente ? (
                  <div className="flex-grow-1 text-success fw-bold">
                    <i className="bi bi-check-circle-fill me-2"></i>Agendado
                  </div>
                ) : (
                  <>
                    <input
                      type="date"
                      className="form-control"
                      style={{ width: "auto" }}
                      min={getDataMinima()}
                      value={datasAgendamento[prof.id] || ""}
                      onChange={(e) =>
                        handleDateChange(prof.id, e.target.value)
                      }
                      disabled={isAgendando}
                    />
                    <button
                      className="btn btn-success"
                      disabled={isAgendando}
                      onClick={() => {
                        const data = datasAgendamento[prof.id];
                        if (data && user?.id) {
                          dispatch(
                            contratarServico({
                              profissional: prof,
                              dataAgendamento: data,
                              clienteId: user.id,
                            })
                          );
                        } else if (!data) {
                          alert("Por favor, selecione uma data.");
                        } else {
                          alert("Erro: Usuário não autenticado.");
                        }
                      }}
                    >
                      {isAgendando ? "Agendando..." : "Agendar"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      });
    } else {
      content = (
        <div className="text-center mt-5">
          <h1>Nenhum profissional encontrado</h1>
          <p>Tente buscar por outro termo.</p>
          <Link to="/buscar" className="btn btn-primary">
            Voltar para a Busca
          </Link>
        </div>
      );
    }
  }

  return (
    <div className={styles.container2}>
      <h1 className="mb-4">Profissionais de {tipoSelecionado}</h1>
      {type === "contratar" && agendamentoStatus === "failed" && (
        <div className="alert alert-danger">
          Ocorreu um erro ao tentar agendar. Tente novamente.
        </div>
      )}
      {content}
    </div>
  );
};

export default ProfsFiltrados;
