import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  agendados: {},
  avaliacoes: {},
  comentarios: {},
  datasAgendamento: {},
  feedbacksVisiveis: {},
  notificacao: null,
  hoverEstrela: {},
};

const profissionaisSlice = createSlice({
  name: 'profissionais',
  initialState,
  reducers: {
    agendarProfissional: (state, action) => {
      const id = action.payload;
      const data = state.datasAgendamento[id];
      if (!data) {
        state.notificacao = { tipo: 'erro', mensagem: 'Selecione uma data válida!' };
        return;
      }
      const escolhida = new Date(data);
      if (escolhida < new Date()) {
        state.notificacao = { tipo: 'erro', mensagem: 'Não é possível agendar para datas passadas!' };
        return;
      }
      state.agendados[id] = true;
      state.feedbacksVisiveis[id] = true;
      state.notificacao = {
        tipo: 'sucesso',
        mensagem: `Agendamento confirmado para ${escolhida.toLocaleDateString('pt-BR')}`
      };
    },
    cancelarAgendamento: (state, action) => {
      const id = action.payload;
      delete state.agendados[id];
      state.feedbacksVisiveis[id] = false;
      state.notificacao = { tipo: 'sucesso', mensagem: 'Agendamento cancelado com sucesso!' };
    },
    setDataAgendamento: (state, action) => {
      const { id, data } = action.payload;
      state.datasAgendamento[id] = data;
    },
    selecionarEstrela: (state, action) => {
      const { id, rating, hover } = action.payload;
      if (hover) {
        state.hoverEstrela[id] = rating;
      } else {
        state.avaliacoes[id] = rating;
      }
    },
    enviarFeedbackProfissional: (state, action) => {
      const { id, comentario, somenteTexto } = action.payload;
      const nota = state.avaliacoes[id] || 0;
      const texto = comentario ?? state.comentarios[id] ?? '';

      if (somenteTexto) {
        state.comentarios[id] = texto;
        return;
      }

      if (!texto.trim()) {
        state.notificacao = { tipo: 'erro', mensagem: 'Escreva seu comentário!' };
        return;
      }
      if (nota === 0) {
        state.notificacao = { tipo: 'erro', mensagem: 'Selecione uma nota de 1 a 5 estrelas!' };
        return;
      }

      state.notificacao = { tipo: 'sucesso', mensagem: 'Feedback enviado com sucesso!' };
      state.avaliacoes[id] = 0;
      state.comentarios[id] = '';
      state.feedbacksVisiveis[id] = false;
    },
    limparNotificacao: (state) => {
      state.notificacao = null;
    }
  }
});

export const {
  agendarProfissional,
  cancelarAgendamento,
  setDataAgendamento,
  selecionarEstrela,
  enviarFeedbackProfissional,
  limparNotificacao
} = profissionaisSlice.actions;

export default profissionaisSlice.reducer;
