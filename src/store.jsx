// src/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import buscaReducer from './features/buscaSlice.jsx';
import telainicialReducer from './features/telainicialSlice';
import profissionaisReducer from './features/profsFiltradosSlice';
import profdetalhesReducer from './features/profDetalhesSlice'; // ajuste o path conforme sua estrutura
// Configure a store com o slice
export const store = configureStore({
  reducer: {
    busca: buscaReducer,
    telaInicial: telainicialReducer, 
    profissionais: profissionaisReducer,
    profdetalhes: profdetalhesReducer,
  }
});

