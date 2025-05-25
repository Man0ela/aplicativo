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
    // … outros profissionais
  ],
  agendados: {},
  datasAgendamento: {},
  comentarios: {},
  avaliacoes: {},
  feedbacksVisiveis: {},
  notificacao: null,
  hoverEstrela: {},
};

const profissionaisSlice = createSlice({
  name: 'profissionais',
  initialState,
  reducers: {
    agendarProfissional: (state, action) => {
      const id = action.payload.id;
      state.agendados[id] = true;
      state.datasAgendamento[id] = action.payload.data;
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
    enviarFeedbackProfissional: (state, action) => {
      const { id, comentario, somenteTexto } = action.payload;
      if (!comentario || (somenteTexto && comentario.trim() === '')) {
        state.notificacao = { tipo: 'erro', mensagem: 'Comentário vazio.' };
        return;
      }
      if (!state.comentarios[id]) state.comentarios[id] = [];
      if (!state.avaliacoes[id]) state.avaliacoes[id] = [];

      if (somenteTexto) {
        state.comentarios[id].push(comentario);
      } else {
        const nota = state.hoverEstrela[id] || 0;
        if (nota === 0) {
          state.notificacao = { tipo: 'erro', mensagem: 'Nota não atribuída.' };
          return;
        }
        state.comentarios[id].push(comentario);
        state.avaliacoes[id].push(nota);
        state.hoverEstrela[id] = 0;
        state.notificacao = { tipo: 'sucesso', mensagem: 'Feedback enviado!' };
      }
      state.feedbacksVisiveis[id] = true;
    },
    selecionarEstrela: (state, action) => {
      const { id, rating } = action.payload;
      state.hoverEstrela[id] = rating;
    },
    limparNotificacao: (state) => {
      state.notificacao = null;
    },
    setFeedbackVisivel: (state, action) => {
      const id = action.payload;
      state.feedbacksVisiveis[id] = !state.feedbacksVisiveis[id];
    },
  },
});

export const {
  agendarProfissional,
  cancelarAgendamento,
  setDataAgendamento,
  enviarFeedbackProfissional,
  selecionarEstrela,
  limparNotificacao,
  setFeedbackVisivel
} = profissionaisSlice.actions;

export default profissionaisSlice.reducer;
