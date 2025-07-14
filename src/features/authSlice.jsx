// features/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { registrarNovoUsuario } from "./usersSlice";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

// Thunk de Login (o seu código já estava bom, apenas para referência)
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", loginData);
      localStorage.setItem("token", response.data.token);
      return response.data; // Retorna { token, user }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// NOVA THUNK: Carrega o usuário a partir do token no localStorage
export const loadUserFromToken = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("Nenhum token encontrado.");
    }

    try {
      // Configura o cabeçalho de autorização para a requisição
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("/api/auth/me", config);
      return { user: response.data }; // Retorna o objeto do usuário
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrarNovoUsuario.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = {
          ...user,
          id: user._id || user.id,
        };
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.status = "succeeded";
      })
      .addCase(loadUserFromToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = "idle";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
