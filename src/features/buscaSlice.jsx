import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tipoServico: '',
  profissionais: [], // Lista de profissionais encontrados
  carregando: false,
  erro: null,
};

const buscaSlice = createSlice({
  name: 'busca',
  initialState,
  reducers: {
    setTipoServico: (state, action) => {
      state.tipoServico = action.payload;
    },
    limparBusca: (state) => {
      state.tipoServico = '';
      state.profissionais = [];
    }
  },
 
});

export const { setTipoServico, limparBusca } = buscaSlice.actions;
export default buscaSlice.reducer;