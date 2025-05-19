import React, { useState , useEffect } from "react";
import cx from 'classnames';
import { Link, useSearchParams } from "react-router-dom";
import styles from "./css/style3.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const profissionais = [
  { id: 1, nome: "João - Piscineiro", tipo: "Piscineiro", estrelas: 4.2, descricao: "João é especialista em manutenção de piscinas." },
  { id: 2, nome: "Maria - Faxineira", tipo: "Faxineira", estrelas: 4.8, descricao: "Maria realiza serviços de limpeza residencial e comercial." },
  { id: 3, nome: "Carlos - Jardineiro", tipo: "Jardineiro", estrelas: 3.9, descricao: "Carlos cuida de jardins e áreas verdes." },
  { id: 4, nome: "Ana - Faxineira", tipo: "Faxineira", estrelas: 4.6, descricao: "Ana oferece serviços de faxina profunda e especializada." },
  { id: 5, nome: "Pedro - Jardineiro", tipo: "Jardineiro", estrelas: 4.1, descricao: "Pedro é especialista em jardinagem e paisagismo." },
];
export default function ProfsFiltrados() {
  const [searchParams] = useSearchParams();
  const tipoSelecionado = searchParams.get("tipo");
  const [agendados, setAgendados] = useState({});
  const [avaliacoes, setAvaliacoes] = useState({});
  const [feedbacksVisiveis, setFeedbacksVisiveis] = useState({});
  const [hoverEstrela, setHoverEstrela] = useState({});
  const [notificacao, setNotificacao] = useState(null);
  const [comentarios, setComentarios] = useState({});
  const [datasAgendamento, setDatasAgendamento] = useState({});
  const handleStarHover = (profId, rating) => {
    setHoverEstrela(prev => ({ ...prev, [profId]: rating }));
  };
   const handleStarLeave = (profId) => {
    setHoverEstrela(prev => ({ ...prev, [profId]: 0 }));
  };
  const Notificacao = () => {
    if (!notificacao) return null;
    return (
      <div className={cx(styles.notificacao, {
        [styles.sucesso]: notificacao.tipo === 'sucesso',
        [styles.erro]: notificacao.tipo === 'erro'
      })}>
        {notificacao.mensagem}
        <button 
          className={styles.fecharNotificacao}
          onClick={() => setNotificacao(null)}
        >
          ×
        </button>
      </div>
    );
  };
    
  const filtrados = profissionais.filter(p => p.tipo === tipoSelecionado);
 
  
  const getDataMinima = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const agendar = (id, data) => {
  if (!data) {
    setNotificacao({
      tipo: 'erro',
      mensagem: 'Selecione uma data válida!'
    });
    return; // Adicione este return para impedir execução posterior
  }

  const escolhida = new Date(data); 
  if (escolhida < new Date()) {
    setNotificacao({ 
      tipo: 'erro', 
      mensagem: 'Não é possível agendar para datas passadas!' 
    });
    return;
  }setAgendados(prev => ({ ...prev, [id]: true }));
  setFeedbacksVisiveis(prev => ({ ...prev, [id]: true }));
  setNotificacao({
    tipo: 'sucesso',
    mensagem: `Agendamento confirmado para ${escolhida.toLocaleDateString('pt-BR')}`
  });
};
useEffect(() => {
  if (notificacao) {
    const timer = setTimeout(() => {
      setNotificacao(null);
    }, 1000); 
    
    return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
  }
}, [notificacao]); // Executa sempre que notificacao mudar


  const cancelar = id => {
    setAgendados(prev => {
      const novo = { ...prev };
      delete novo[id];
      return novo;
    });
    setFeedbacksVisiveis(prev => ({ ...prev, [id]: false }));
    setNotificacao({ 
    tipo: 'sucesso', 
    mensagem: 'Agendamento cancelado com sucesso!' 
  });
  };
    
  const selecionarEstrela = (id, nota) => {
    setAvaliacoes(prev => ({ ...prev, [id]: nota }));
  };
 

  const enviarFeedback = (id, texto) => {
    const nota = avaliacoes[id] || 0;
    if (!texto.trim()) {
      setNotificacao({ tipo: 'erro', mensagem: 'Escreva seu comentário!' });
      return;
    }
    if (nota === 0) {
      setNotificacao({ tipo: 'erro', mensagem: 'Selecione uma nota de 1 a 5 estrelas!' });
      return;
    }
     setNotificacao({
    tipo: 'sucesso',
    mensagem: 'Feedback enviado com sucesso!'
  });
   
  
  // Limpeza
  setAvaliacoes(prev => ({ ...prev, [id]: 0 }));
  setComentarios(prev => ({ ...prev, [id]: '' }));
  setFeedbacksVisiveis(prev => ({ ...prev, [id]: false }));
};
    const EstrelasAvaliacao = ({ profId, onRate }) => {
    return (
      <div className={styles.avaliacaoEstrelas}>
        {[1, 2, 3, 4, 5].map(i => (
          <span
            key={i}
            className={cx(styles.estrela, {
              [styles.hover]: i <= (hoverEstrela[profId] || 0),
              [styles.selecionada]: i <= (avaliacoes[profId] || 0)
            })}
            onMouseEnter={() => handleStarHover(profId, i)}
            onMouseLeave={() => handleStarLeave(profId)}
            onClick={() => onRate(profId, i)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container2}>
      <Notificacao />
      <h1>Profissionais de {tipoSelecionado}</h1>
      {filtrados.map(prof => (
        <div key={prof.id} className="profissional">
          <h2>
            <Link to={`/profissional/${prof.id}`} className="link-profissional">
              {prof.nome}
            </Link>
          </h2>

          {/* Exibição de avaliação média */}
          <div className={cx(styles.avaliacaoEstrelas)}>
            {[1,2,3,4,5].map(i => (
              <span
                key={i}
                className={cx(styles.estrela, {
                  [styles.selecionada]: i <= Math.round(prof.estrelas)
                })}
              >
                &#9733;
              </span>
            ))}
            <span>({prof.estrelas.toFixed(1)})</span>
          </div>

          {/* Agendamento */}
          <div className="data-agendamento">
            <label htmlFor={`data-${prof.id}`}>Selecione uma data: </label>
            <input
        type="date"
        value={datasAgendamento[prof.id] || ''}
        onChange={(e) => setDatasAgendamento(prev => ({
          ...prev,
            [prof.id]: e.target.value
        }))}
         min={getDataMinima()}
        />

          </div>
          <div className="botoes">
            <button className={styles.agendar} onClick={() => {
              agendar(prof.id, datasAgendamento[prof.id]);
            }}>Agendar</button>
            <button  className={styles.cancelar}
              disabled={!agendados[prof.id]}
              onClick={() => cancelar(prof.id)}
            >Cancelar</button>
          </div>

          {/* Feedback */}
          {feedbacksVisiveis[prof.id] && (
    <div className="feedback-area">
      <textarea
        id={`comentario-${prof.id}`}
        value={comentarios[prof.id] || ''}
        onChange={(e) => setComentarios(prev => ({
          ...prev,
          [prof.id]: e.target.value
        }))}
        rows={3}
        cols={40}
        placeholder="Deixe seu comentário"
      />

      <EstrelasAvaliacao
        profId={prof.id}
        onRate={selecionarEstrela}
      />

              <button onClick={() => {
                const texto = comentarios[prof.id]?.trim() || '';
                enviarFeedback(prof.id, texto);
              }}>Enviar Feedback</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
