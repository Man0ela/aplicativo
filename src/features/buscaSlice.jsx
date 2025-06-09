import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

// Adapter para normalizar profissionais
const professionalsAdapter = createEntityAdapter();

// Thunk para buscar profissionais
export const fetchProfissionais = createAsyncThunk(
  'busca/fetchProfissionais',
  async () => {
    const response = await fetch('http://localhost:3001/profissionais');
    if (!response.ok) throw new Error('Falha ao buscar profissionais');
    return await response.json();
  }
);

const buscaSlice = createSlice({
  name: 'busca',
  initialState: professionalsAdapter.getInitialState({
    tipoServico: '',
    status: 'idle',
    error: null,
  }),
  reducers: {
    setTipoServico(state, action) {
      state.tipoServico = action.payload;
    },
    limparBusca(state) {
      state.tipoServico = '';
      professionalsAdapter.removeAll(state);
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfissionais.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfissionais.fulfilled, (state, action) => {
        state.status = 'succeeded';
        professionalsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProfissionais.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setTipoServico, limparBusca } = buscaSlice.actions;
export default buscaSlice.reducer;

// Seletores gerados pelo adapter
export const {
  selectAll: selectAllProfissionais,
  selectById: selectProfissionalById,
  selectIds: selectProfissionalIds,
} = professionalsAdapter.getSelectors((state) => state.busca);
