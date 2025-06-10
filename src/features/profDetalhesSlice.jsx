import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// A Thunk continua sendo a forma de buscar os dados na API
export const fetchProfissionalById = createAsyncThunk(
  "profDetalhes/fetchProfissionalById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/profissionais/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Profissional não encontrado"
      );
    }
  }
);

// O estado inicial foi drasticamente simplificado
const initialState = {
  profissional: null, // Armazena apenas o profissional sendo visto
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const profDetalhesSlice = createSlice({
  name: "profDetalhes",
  initialState,
  // Reducers síncronos foram removidos pois não há mais ações locais
  reducers: {},
  // Extra reducers agora lidam apenas com o ciclo de vida da busca
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfissionalById.pending, (state) => {
        state.status = "loading";
        state.profissional = null; // Limpa o profissional anterior enquanto carrega
        state.error = null;
      })
      .addCase(fetchProfissionalById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profissional = action.payload; // Armazena o profissional encontrado
      })
      .addCase(fetchProfissionalById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Apenas a thunk precisa ser exportada

export default profDetalhesSlice.reducer;
