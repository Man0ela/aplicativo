import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk para buscar os dados do dashboard do profissional
export const fetchServicosDoProfissional = createAsyncThunk(
  'dashboard/fetchServicos',
  async (profissionalId, { rejectWithValue }) => {
    try {
      // Chama a nova rota que criamos no backend
      const response = await axios.get(`/api/servicos/profissional/${profissionalId}`);
      return response.data; // Deve retornar { historico: [...], solicitacoes: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Falha ao carregar dados do dashboard.');
    }
  }
);

const initialState = {
  historicoServicos: [],    
  solicitacoesServicos: [], 
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const dashboardProfissionalSlice = createSlice({
  name: 'dashboardProfissional',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicosDoProfissional.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServicosDoProfissional.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Preenche os arrays com os dados vindos da API
        state.historicoServicos = action.payload.historico;
        state.solicitacoesServicos = action.payload.solicitacoes;
      })
      .addCase(fetchServicosDoProfissional.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default dashboardProfissionalSlice.reducer;