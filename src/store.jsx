// src/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import buscaReducer from './features/buscaSlice.jsx';

// Configure a store com o slice
export const store = configureStore({
  reducer: {
    busca: buscaReducer,

  }
});

export default buscaSlice.reducer;