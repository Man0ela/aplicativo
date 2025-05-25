import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [
    {
      id: 1,
      nome: 'João Silva',
      tipo: 'Encanador',
      estrelas: 4,
      descricao: 'Com mais de 10 anos de experiência, João Silva é especialista em manutenção hidráulica residencial e comercial. Realiza serviços como desentupimentos, consertos de vazamentos, troca de torneiras, instalações de encanamentos e muito mais, sempre com agilidade e garantia de qualidade.',
      preco: 150,
      distanciaMaxima: 30
    },
    {
      id: 2,
      nome: 'Maria Souza',
      tipo: 'Eletricista',
      estrelas: 5,
      descricao: 'Maria Souza é uma eletricista qualificada com formação técnica e anos de atuação no setor. Trabalha com instalações elétricas, reparos em quadros de energia, troca de disjuntores, fiação residencial e comerciais, sempre com foco em segurança, organização e eficiência.',
      preco: 200,
      distanciaMaxima: 20
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
  },
  ],
  agendados: {},
  datasAgendamento: {},
  comentarios: {},          // array de comentários por prof
  avaliacoes: {},           // nota definitiva por prof
  hoverEstrela: {},         // nota para hover visual
  notaSelecionada: {},      // nota escolhida antes do envio
  feedbacksVisiveis: {},
  notificacao: null,
};

const profissionaisSlice = createSlice({
  name: 'professionais',
  initialState,
  reducers: {
    agendarProfissional: (state, action) => {
      const { id, data } = action.payload;
      state.agendados[id] = true;
      state.datasAgendamento[id] = data;
      state.notificacao = { tipo: 'sucesso', mensagem: 'Agendamento confirmado!' };
    },
    cancelarAgendamento: (state, action) => {
      const id = action.payload;
      delete state.agendados[id];
      delete state.datasAgendamento[id];
      state.notificacao = { tipo: 'sucesso', mensagem: 'Agendamento cancelado.' };
    },
    setDataAgendamento: (state, action) => {
      const { id, data } = action.payload;
      state.datasAgendamento[id] = data;
    },

    // Hover visual
    setHoverEstrela: (state, action) => {
      const { id, rating } = action.payload;
      state.hoverEstrela[id] = rating;
    },

    // Seleção definitiva
    selecionarEstrela: (state, action) => {
      const { id, rating } = action.payload;
      state.notaSelecionada[id] = rating;
    },

    enviarFeedbackProfissional: (state, action) => {
      const { id, comentario } = action.payload;
      const nota = state.notaSelecionada[id] || 0;
      if (!state.agendados[id]) {
         state.notificacao = { tipo: 'erro', mensagem: 'Agendamento necessário para feedback.' };
         return;
        }
      if (!comentario?.trim()) {
        state.notificacao = { tipo: 'erro', mensagem: 'Comentário vazio.' };
        return;
      }
      if (nota === 0) {
        state.notificacao = { tipo: 'erro', mensagem: 'Nota não atribuída.' };
        return;
      }
      // inicializa arrays
      if (!state.comentarios[id]) state.comentarios[id] = [];
      
      state.comentarios[id].push(comentario);
      state.avaliacoes[id] = nota;
      // reset temporários
      state.notaSelecionada[id] = 0;
      state.hoverEstrela[id] = 0;
      state.feedbacksVisiveis[id] = true;
      state.notificacao = { tipo: 'sucesso', mensagem: 'Feedback enviado!' };
    },

    limparNotificacao: (state) => {
      state.notificacao = null;
    },
    setFeedbackVisivel: (state, action) => {
      const {id} = action.payload;
      state.feedbacksVisiveis[id] = !state.feedbacksVisiveis[id];
    }
  }
});

export const {
  agendarProfissional,
  cancelarAgendamento,
  setDataAgendamento,
  setHoverEstrela,
  selecionarEstrela,
  enviarFeedbackProfissional,
  limparNotificacao,
  setFeedbackVisivel
} = profissionaisSlice.actions;

export default profissionaisSlice.reducer;
