import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfissionais = createAsyncThunk(
  'profissionais/fetchProfissionais',
  async () => {
    const response = await axios.get('http://localhost:3001/profissionais');
    return response.data;
  }
);

const initialState = {
  lista: [],
  loading: false,
  error: null,
  agendados: {},
  datasAgendamento: {},
  comentarios: {},
  avaliacoes: {},
  hoverEstrela: {},
  notaSelecionada: {},
  feedbacksVisiveis: {},
  notificacao: null,
};

const profissionaisSlice = createSlice({
  name: 'profissionais',
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
    setNotificacao: (state, action) => {
    const { tipo, mensagem } = action.payload;
    state.notificacao = { tipo, mensagem };
    },
    setHoverEstrela: (state, action) => {
      const { id, rating } = action.payload;
      state.hoverEstrela[id] = rating;
    },
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
      if (!state.comentarios[id]) state.comentarios[id] = [];

      state.comentarios[id].push(comentario);
      state.avaliacoes[id] = nota;
      state.notaSelecionada[id] = 0;
      state.hoverEstrela[id] = 0;
      state.feedbacksVisiveis[id] = true;
      state.notificacao = { tipo: 'sucesso', mensagem: 'Feedback enviado!' };
    },
    limparNotificacao: (state) => {
      state.notificacao = null;
    },
    setFeedbackVisivel: (state, action) => {
      const { id } = action.payload;
      state.feedbacksVisiveis[id] = !state.feedbacksVisiveis[id];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfissionais.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfissionais.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchProfissionais.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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
  setFeedbackVisivel,
  setNotificacao 
} = profissionaisSlice.actions;

export default profissionaisSlice.reducer;
