import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./css/style3.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Notification = ({ type, message }) => {
  if (!message) return null;
  return (
    <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-danger'}`}>
      {message}
    </div>
  );
};

const profissionais = [
  {
    id: 1,
    nome: 'João Silva',
    tipo: 'Encanador',
    estrelas: 4,
    descricao: 'Com mais de 10 anos de experiência, João Silva é especialista em manutenção hidráulica residencial e comercial. Realiza serviços como desentupimentos, consertos de vazamentos, troca de torneiras, instalações de encanamentos e muito mais, sempre com agilidade e garantia de qualidade.',
    preco: 150,
    distancia: 10
  },
  {
    id: 2,
    nome: 'Maria Souza',
    tipo: 'Eletricista',
    estrelas: 5,
    descricao: 'Maria Souza é uma eletricista qualificada com formação técnica e anos de atuação no setor. Trabalha com instalações elétricas, reparos em quadros de energia, troca de disjuntores, fiação residencial e comerciais, sempre com foco em segurança, organização e eficiência.',
    preco: 200,
    distancia: 5
  },
  {
    id: 3,
    nome: 'Carlos Santos',
    tipo: 'Pedreiro',
    estrelas: 3,
    descricao: 'Carlos Santos oferece serviços de alvenaria, reformas, construções e reparos em geral. Possui experiência em construção de muros, colocação de pisos, reboco, pintura e acabamento. Atua com responsabilidade, prezando pela limpeza e prazo de entrega.',
    preco: 180,
    distancia: 15
  },
  {
     id: 4,
    nome: "Ana - Faxineira",
    tipo: "Faxineira",
    estrelas: 4.6,
    descricao: "Ana oferece serviços de faxina profunda e especializada, incluindo limpeza pós-obra, higienização de estofados e remoção de manchas. Tem experiência com residências e escritórios.",
    preco: 110,
    distancia: 6
  },
  {
     id: 5,
    nome: "Pedro - Jardineiro",
    tipo: "Jardineiro",
    estrelas: 4.1,
    descricao: "Pedro é especialista em jardinagem e paisagismo, criando e mantendo jardins harmônicos com uso eficiente de recursos naturais. Faz desde projetos simples até manutenções recorrentes.",
    preco: 140,
    distancia: 9
  }
];

function ProfissionalDetalhes() {
  const { id } = useParams();
  const profissional = profissionais.find((p) => p.id === Number(id));

  const [selectedDate, setSelectedDate] = useState('');
  const [agendados, setAgendados] = useState([]);
  const [datasAgendamento, setDatasAgendamento] = useState([]);

  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState(0);
  const [hoverEstrela, setHoverEstrela] = useState(0);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [feedbacksVisiveis, setFeedbacksVisiveis] = useState(false);

  const [notificacao, setNotificacao] = useState({ type: '', message: '' });

  if (!profissional) {
    return <div className="container mt-5 " style={{ maxWidth: '700px' }} >Profissional não encontrado.</div>;
  }

  const isAgendado = agendados.includes(profissional.id);
  const indexAgendamento = agendados.indexOf(profissional.id);
  const dataAgendada = isAgendado ? datasAgendamento[indexAgendamento] : null;

  const handleConfirmar = () => {
    if (!selectedDate) {
      setNotificacao({ type: 'error', message: 'Selecione uma data para agendar.' });
      return;
    }
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataSelecionada = new Date(selectedDate);
    if (dataSelecionada < hoje) {
      setNotificacao({ type: 'error', message: 'Não é possível agendar para datas passadas.' });
      return;
    }
    setAgendados([...agendados, profissional.id]);
    setDatasAgendamento([...datasAgendamento, selectedDate]);
    setNotificacao({ type: 'success', message: 'Agendamento confirmado!' });
    setSelectedDate('');
  };

  const handleCancelar = () => {
    const newAgendados = agendados.filter((pid) => pid !== profissional.id);
    const newDatas = datasAgendamento.filter((_, i) => i !== indexAgendamento);
    setAgendados(newAgendados);
    setDatasAgendamento(newDatas);
    setNotificacao({ type: 'success', message: 'Agendamento cancelado.' });
  };

  const handleEnviarAvaliacao = () => {
    if (comentario.trim() === '' || nota === 0) {
      setNotificacao({ type: 'error', message: 'Por favor, escreva um comentário e selecione uma nota.' });
      return;
    }
    setAvaliacoes([...avaliacoes, nota]);
    setComentarios([...comentarios, comentario]);
    setNotificacao({ type: 'success', message: 'Avaliação enviada!' });
    setComentario('');
    setNota(0);
    setHoverEstrela(0);
    if (!feedbacksVisiveis) {
      setFeedbacksVisiveis(true);
    }
  };

  return (
    <div className={`container mt-5  ${styles["perfil-container"]}`} style={{ maxWidth: '700px' } }>
      <h2 className={styles["titulo-profissional"]}>{profissional.nome}</h2>
      <h4 className={styles["subtitulo"]}>{profissional.tipo}</h4>
      <div className="mb-3">
        {'★'.repeat(profissional.estrelas)}{'☆'.repeat(5 - profissional.estrelas)}
      </div>
      <p>{profissional.descricao}</p>
      <p><strong>Preço:</strong> R$ {profissional.preco.toFixed(2)}</p>
      <p><strong>Distância:</strong> {profissional.distancia} km</p>

      <Notification type={notificacao.type} message={notificacao.message} />

      <div className="mt-4">
        <h5>Agendamento</h5>
        {!isAgendado ? (
          <div>
            <input
              type="date"
              className="form-control my-2"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleConfirmar}>Confirmar Agendamento</button>
          </div>
        ) : (
          <div>
            <p>Agendado para: {dataAgendada}</p>
            <button className="btn btn-danger" onClick={handleCancelar}>Cancelar Agendamento</button>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h5>Feedback</h5>
        <textarea
          className="form-control my-2"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escreva seu comentário..."
        />
        <div className="mb-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onMouseEnter={() => setHoverEstrela(num)}
              onMouseLeave={() => setHoverEstrela(0)}
              onClick={() => setNota(num)}
              style={{ color: num <= (hoverEstrela || nota) ? 'gold' : 'gray', cursor: 'pointer', fontSize: '1.5rem' }}
            >
              ★
            </span>
          ))}
        </div>
        <button className="btn btn-success" onClick={handleEnviarAvaliacao}>Enviar Feedback</button>
      </div>

      <div className="mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => setFeedbacksVisiveis(!feedbacksVisiveis)}
        >
          {feedbacksVisiveis ? 'Ocultar Feedbacks' : 'Mostrar Feedbacks'}
        </button>
      </div>

      {feedbacksVisiveis && comentarios.length > 0 && (
        <div className="mt-4">
          <h6>Comentários:</h6>
          {comentarios.map((com, index) => (
            <div key={index} className="border p-3 rounded mb-2 bg-light">
              <div>{'★'.repeat(avaliacoes[index])}{'☆'.repeat(5 - avaliacoes[index])}</div>
              <p className="mb-0">{com}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfissionalDetalhes;
