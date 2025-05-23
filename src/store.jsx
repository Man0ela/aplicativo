// src/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import buscaReducer from './features/buscaSlice.jsx';
import telainicialReducer from './features/telainicialSlice';

// Configure a store com o slice
export const store = configureStore({
  reducer: {
    busca: buscaReducer,
    telaInicial: telainicialReducer, 
  }
});

