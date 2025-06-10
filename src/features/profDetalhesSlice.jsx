import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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


const initialState = {
  profissional: null, // Armazena apenas o profissional sendo visto
  status: "idle", 
  error: null,
};

const profDetalhesSlice = createSlice({
  name: "profDetalhes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfissionalById.pending, (state) => {
        state.status = "loading";
        state.profissional = null; 
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



export default profDetalhesSlice.reducer;
