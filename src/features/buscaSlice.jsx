import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const professionalsAdapter = createEntityAdapter();

const initialState = professionalsAdapter.getInitialState({
    tipoServico: '',
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
});

export const fetchProfissionais = createAsyncThunk(
    'busca/fetchProfissionais',
    async (tipoServico, { rejectWithValue }) => {
        // Validação para não fazer chamadas desnecessárias à API
        if (typeof tipoServico !== 'string' || tipoServico.trim() === '') {
            return []; // Retorna um array vazio se a busca for inválida
        }

        // <-- CORREÇÃO 1: A porta foi alterada de 3001 para 3000
        const url = `/api/profissionais?tipo_like=${encodeURIComponent(tipoServico)}`;
        
        try {
            const response = await axios.get(url);
            // O axios já trata erros de rede, então o !response.ok não é necessário da mesma forma.
            // O 'data' já vem no formato JSON.
            return response.data;
        } catch (error) {
            // Se houver um erro na requisição (ex: servidor offline), ele será capturado aqui.
            return rejectWithValue(error.response?.data?.message || 'Falha ao buscar profissionais.');
        }
    }
);

const buscaSlice = createSlice({
    name: 'busca',
    initialState,
    reducers: {
        setTipoServico(state, action) {
            state.tipoServico = action.payload;
        },
        limparBusca(state) {
            state.tipoServico = '';
            professionalsAdapter.removeAll(state);
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfissionais.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProfissionais.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // <-- CORREÇÃO 2: Agora, um array vazio vindo do back-end
                // será um resultado 'fulfilled', e o adapter vai simplesmente
                // guardar um estado vazio, permitindo que o componente
                // mostre a mensagem "Nenhum profissional encontrado".
                professionalsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchProfissionais.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                professionalsAdapter.removeAll(state);
            });
    },
});

export const { setTipoServico, limparBusca } = buscaSlice.actions;

export const {
    selectAll: selectAllProfissionais,
} = professionalsAdapter.getSelectors((state) => state.busca);

export default buscaSlice.reducer;