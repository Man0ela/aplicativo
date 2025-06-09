import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

// 1. IMPORTAÇÕES DA BUSCA (permanecem as mesmas)
import { selectAllProfissionais, fetchProfissionais } from "./features/buscaSlice";

// 2. IMPORTAÇÕES DO SLICE DE FILTRADOS (agora simplificado)
// A única responsabilidade deste slice é guardar a data selecionada no calendário.
import { setDataAgendamento } from "./features/profsFiltradosSlice"; 

// 3. IMPORTAÇÕES DA LÓGICA DE SERVIÇOS (o cérebro da operação)
// Importamos toda a lógica de agendar, cancelar e buscar os serviços reais.
import { 
    contratarServico, 
    cancelarServico,
    fetchServicos,
    selectAllServicos,
    resetActionStatus
} from './features/servicosSlice';

import cx from "classnames";
import styles from "./css/style3.module.css";
import "bootstrap/dist/css/bootstrap.min.css";


const ProfsFiltrados = () => {
  const [searchParams] = useSearchParams();
  const tipoSelecionado = searchParams.get("tipo");
  const dispatch = useDispatch();

  // --- SELETORES DE ESTADO ATUALIZADOS ---

  // Estado da busca de profissionais
  const statusBusca = useSelector((state) => state.busca.status);
  const errorBusca = useSelector((state) => state.busca.error);
  const profissionais = useSelector(selectAllProfissionais);
  
  // Estado do calendário (do slice simplificado)
  const { datasAgendamento } = useSelector((state) => state.profissionais);
  
  // NOVO: Estado dos serviços já contratados para saber o status de agendamento
  const servicosContratados = useSelector(selectAllServicos);
  const statusServicos = useSelector(state => state.servicosContratados.status);
  const { actionStatus } = useSelector(state => state.servicosContratados);

  
  // --- LÓGICA DE BUSCA DE DADOS ---
  
  useEffect(() => {
    // Busca a lista de profissionais filtrados quando a página carrega
    if (tipoSelecionado) {
      dispatch(fetchProfissionais(tipoSelecionado));
    }
    // Busca o histórico de serviços para saber quais profissionais já foram agendados
    if (statusServicos === 'idle') {
        dispatch(fetchServicos());
    }
  }, [tipoSelecionado, statusServicos, dispatch]);

  const getDataMinima = () => new Date().toISOString().split("T")[0];
  
  // --- RENDERIZAÇÃO DE STATUS ---

  if (statusBusca === "loading") return <p className="text-center mt-5">Carregando profissionais...</p>;
  if (statusBusca === "failed") return <p className="text-center mt-5 alert alert-danger">Erro: {errorBusca}</p>;
  if (statusBusca !== "succeeded" || profissionais.length === 0) {
      return (
        <div className="text-center mt-5">
            <h1>Nenhum profissional encontrado</h1>
            <p>Tente buscar por outro termo.</p>
            <Link to="/buscar" className="btn btn-primary">Voltar para a Busca</Link>
        </div>
      )
  }

  // --- COMPONENTE PRINCIPAL ---
  return (
    <div className={styles.container2}>
      <h1 className="mb-4">Profissionais de {tipoSelecionado}</h1>
      
      { profissionais.map((prof) => {
            const agendamentoExistente = servicosContratados.find(s => s.profissionalId === prof.id);
            
            // Verifica se uma ação está em andamento para este profissional específico
            const isContratando = actionStatus.type === 'contratar' && actionStatus.profissionalId === prof.id && actionStatus.status === 'loading';
            const isCancelando = actionStatus.type === 'cancelar' && actionStatus.servicoId === agendamentoExistente?.id && actionStatus.status === 'loading';

        return (
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

              {/* LÓGICA CONDICIONAL PARA AGENDAMENTO */}
              <div className="d-flex flex-wrap gap-2 align-items-center mt-3 p-3 border rounded bg-light">
                {agendamentoExistente ? (
                  // SE JÁ FOI AGENDADO, mostra a data e o botão de CANCELAR
                  <>
                    <div className="flex-grow-1">
                      <p className="mb-0">
                        <strong>Agendado para:</strong> {new Date(agendamentoExistente.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                      </p>
                      <small className="text-muted">Para avaliar, acesse seu Histórico.</small>
                    </div>
                    <button 
                    className="btn btn-danger"
                    onClick={() => dispatch(cancelarServico(agendamentoExistente.id))}
                    disabled={isCancelando} // Desabilita enquanto cancela
                      >
                    {isCancelando ? 'Cancelando...' : 'Cancelar Agendamento'}
                    </button>
                  </>
                ) : (
                  // SE NÃO FOI AGENDADO, mostra o calendário e o botão de AGENDAR
                  <>
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
    // O 'onClick' agora só tem a lógica de clique
    onClick={() => {
        const dataAgendamento = datasAgendamento[prof.id];
        if (dataAgendamento) {
            dispatch(contratarServico({ profissional: prof, dataAgendamento }));
        } else {
            alert('Por favor, selecione uma data para o agendamento.');
        }
    }}
    // 1. O 'disabled' foi movido para fora, como uma propriedade do botão
    disabled={isContratando} 
>
    {/* 2. O texto duplicado foi removido, deixando apenas a lógica condicional */}
    {isContratando ? 'Agendando...' : 'Agendar'}
                </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfsFiltrados;