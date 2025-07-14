import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

// O adapter otimiza o armazenamento da lista de serviços
const servicesAdapter = createEntityAdapter({
    selectId: (servico) => servico.id,
});

const initialState = servicesAdapter.getInitialState({
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    actionStatus: { type: null, servicoId: null, status: 'idle' } 
});

// ================================================================
// ## THUNKS CORRIGIDAS ##
// ================================================================

// THUNK PARA BUSCAR O HISTÓRICO DE SERVIÇOS DO CLIENTE LOGADO
export const fetchServicos = createAsyncThunk(
    'servicos/fetchServicos',
    // O primeiro argumento é _, pois não precisamos passar nada do componente
    async (_, { getState, rejectWithValue }) => {
        try {
            // Pega o usuário logado do estado 'auth'
            const { user } = getState().auth;
            if (!user || !user.id) {
                return rejectWithValue('Usuário não autenticado.');
            }
            
            // CORREÇÃO: Envia o ID do cliente como um parâmetro de busca na URL
            const response = await axios.get(`http://localhost:3001/servicos?clienteId=${user.id}`);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Falha ao buscar histórico.');
        }
    }
);

// THUNK PARA CONTRATAR UM NOVO SERVIÇO (AGENDAMENTO)
export const contratarServico = createAsyncThunk(
    'servicos/contratarServico',
    // Recebe { profissional, dataAgendamento } do componente
    async ({ profissional, dataAgendamento }, { getState, rejectWithValue }) => {
        try {
            const { user } = getState().auth;
            if (!user || !user.id) {
                return rejectWithValue('Faça login para contratar um serviço.');
            }

            // Monta o objeto com os dados que o back-end espera
            const novoServico = {
                nome: profissional.nome,
                tipo: profissional.tipo,
                profissionalId: profissional.id,
                data: dataAgendamento,
                clienteId: user.id // CORREÇÃO: Inclui o ID do cliente logado
            };

            const response = await axios.post('http://localhost:3001/servicos', novoServico);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Falha ao agendar serviço.');
        }
    }
);

// THUNK PARA ENVIAR A AVALIAÇÃO DE UM SERVIÇO
export const enviarAvaliacao = createAsyncThunk(
    'servicos/enviarAvaliacao',
    async ({ id, avaliacao, nota }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:3001/servicos/${id}`, {
                avaliacao: avaliacao,
                avaliacaoGeral: nota
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Falha ao enviar avaliação.');
        }
    }
);

// THUNK PARA CANCELAR UM SERVIÇO
export const cancelarServico = createAsyncThunk(
    'servicos/cancelarServico',
    async (servicoId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:3001/servicos/${servicoId}`);
            return servicoId; // Retorna o ID para remoção do estado
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Falha ao cancelar serviço.');
        }
    }
);


// ================================================================
// ## SLICE ##
// ================================================================

const servicosSlice = createSlice({
    name: 'servicosContratados',
    initialState,
    reducers: {
        resetActionStatus: (state) => {
            state.actionStatus = { type: null, servicoId: null, status: 'idle' };
        }
    },
    extraReducers: (builder) => {
        builder
            // Casos para fetchServicos
            .addCase(fetchServicos.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchServicos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                servicesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchServicos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Casos para contratarServico
            .addCase(contratarServico.pending, (state, action) => {
                state.actionStatus = { type: 'contratar', profissionalId: action.meta.arg.profissional.id, status: 'loading' };
            })
            .addCase(contratarServico.fulfilled, (state, action) => {
                state.actionStatus = { status: 'succeeded' };
                servicesAdapter.addOne(state, action.payload);
            })
            .addCase(contratarServico.rejected, (state, action) => {
                state.actionStatus = { status: 'failed' };
                state.error = action.payload;
            })
            // Caso para enviarAvaliacao
            .addCase(enviarAvaliacao.fulfilled, (state, action) => {
                servicesAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload
                });
            })
            // Casos para cancelarServico
            .addCase(cancelarServico.pending, (state, action) => {
                state.actionStatus = { type: 'cancelar', servicoId: action.meta.arg, status: 'loading' };
            })
            .addCase(cancelarServico.fulfilled, (state, action) => {
                state.actionStatus = { status: 'succeeded' };
                servicesAdapter.removeOne(state, action.payload);
            })
            .addCase(cancelarServico.rejected, (state, action) => {
                state.actionStatus = { status: 'failed' };
                state.error = action.payload;
            });
    }
});

export const { resetActionStatus } = servicosSlice.actions;

// Exporta os seletores do adapter
export const {
    selectAll: selectAllServicos,
    selectById: selectServicoById,
} = servicesAdapter.getSelectors(state => state.servicosContratados);

export const { toggleAvaliacaoVisivel } = servicosSlice.actions;
export default servicosSlice.reducer;