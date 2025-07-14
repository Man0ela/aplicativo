import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

import { registrarNovoUsuario } from './usersSlice';
import axios from 'axios';
const initialState = {
    user: null, 
    isAuthenticated: false,
};
export const loginUser = createAsyncThunk(
    'auth/login',
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/login', loginData);
            // Salva o token no localStorage para manter a sessão
            localStorage.setItem('token', response.data.token);
            return response.data; // Retorna { token, user }
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
    },
    //  este bloco de extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(registrarNovoUsuario.fulfilled, (state, action) => {
                // QUANDO a thunk 'registrarNovoUsuario' for completada com SUCESSO...
                
                // pegamos os dados do novo usuário que vieram do back-end (o action.payload)...
                state.user = action.payload;
                // e o definimos como o usuário autenticado na sessão.
                state.isAuthenticated = true;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'; // Você pode adicionar status ao authSlice se quiser
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user; // Salva os dados do usuário
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;