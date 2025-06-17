import { createSlice } from '@reduxjs/toolkit';
// 1. Importe a action do outro slice. É assim que um slice "ouve" o outro.
import { registrarNovoUsuario } from './usersSlice';

const initialState = {
    user: null, // Vai guardar as infos do usuário logado (ex: { id: '...', nome: '...' })
    isAuthenticated: false,
};

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
                
                // ...pegamos os dados do novo usuário que vieram do back-end (o action.payload)...
                state.user = action.payload;
                // ...e o definimos como o usuário autenticado na sessão.
                state.isAuthenticated = true;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;