import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

// O adapter ajuda a gerenciar a lista de profissionais de forma eficiente.
const professionalsAdapter = createEntityAdapter();

//
// AQUI ESTÁ A CORREÇÃO PRINCIPAL
//
export const fetchProfissionais = createAsyncThunk(
  'busca/fetchProfissionais',
  // 1. A função agora aceita 'tipoServico' como argumento.
  async (tipoServico, { rejectWithValue }) => {
    
    // 2. Se o termo de busca não for uma string válida, retorna uma lista vazia para evitar erros.
    if (typeof tipoServico !== 'string' || tipoServico.trim() === '') {
      return []; 
    }

    // 3. O 'tipoServico' é adicionado à URL para que o json-server filtre os dados.
    // O `tipo_like` faz uma busca por texto no campo "tipo" do seu db.json.
    const url = `http://localhost:3001/profissionais?tipo_like=${encodeURIComponent(tipoServico)}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('A requisição ao servidor falhou.');
      }
      const data = await response.json();
      
      // Se a API retorna uma lista vazia, informamos ao usuário.
      if (data.length === 0) {
        return rejectWithValue(`Nenhum profissional encontrado para "${tipoServico}".`);
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const buscaSlice = createSlice({
  name: 'busca',
  initialState: professionalsAdapter.getInitialState({
    tipoServico: '',
    status: 'idle', // idle | loading | succeeded | failed
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfissionais.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfissionais.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // `setAll` limpa o estado antigo e adiciona apenas os profissionais filtrados.
        professionalsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProfissionais.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        professionalsAdapter.removeAll(state); // Limpa a lista em caso de erro.
      });
  },
});

export const { setTipoServico, limparBusca } = buscaSlice.actions;

// Seletor para pegar todos os profissionais do estado da busca.
export const {
  selectAll: selectAllProfissionais,
} = professionalsAdapter.getSelectors((state) => state.busca);

export default buscaSlice.reducer;