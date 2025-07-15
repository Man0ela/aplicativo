import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Thunk para registrar um novo usuário (cliente OU profissional)
export const registrarNovoUsuario = createAsyncThunk(
    'users/registrar',
    async ({ tipoUsuario, dados }, { rejectWithValue }) => {
        try {
            let endpoint = '';
            let payload = {};

            // Prepara o endpoint e o payload corretos dependendo do tipo de usuário
            if (tipoUsuario === 'profissional') {
               
                endpoint = '/api/profissionais';
                
                // Mapeia os nomes dos campos do formulário para os nomes do seu Model no back-end
                payload = {
                    nome: dados.nome,
                    email: dados.email,
                    senha: dados.senha,
                    tipo: dados.especialidade,
                    descricao: dados.descricaoServico,
                    valorPorHora: dados.preco,                 
                    distanciaMaxima: dados.distanciaAtendimento, 
                    estrelas: 5
                };
            } else {
         
                endpoint = '/api/clientes';
                payload = {
                    nome: dados.nome,
                    email: dados.email,
                    senha: dados.senha,
                };
            }
            
            const response = await axios.post(endpoint, payload);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || `Erro ao cadastrar ${tipoUsuario}. Verifique se o servidor está rodando.`);
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState: {
        items: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registrarNovoUsuario.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registrarNovoUsuario.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(registrarNovoUsuario.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});


export default usersSlice.reducer;