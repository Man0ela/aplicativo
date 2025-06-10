import { createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';

// 2. createEntityAdapter: Otimiza o armazenamento dos serviços.
// Em vez de um array, teremos um objeto com 'ids' e 'entities'.
const servicesAdapter = createEntityAdapter({
    // Assume que cada serviço tem um campo 'id'
    selectId: (servico) => servico.id,
});

// 3. createAsyncThunk: Para operações assíncronas (API).

// Thunk para BUSCAR todos os serviços contratados
export const fetchServicos = createAsyncThunk(
    'servicosContratados/fetchServicos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3001/servicos');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Erro ao buscar serviços');
        }
    }
);

export const contratarServico = createAsyncThunk(
    'servicosContratados/contratarServico',
    async ({ profissional, dataAgendamento }, { rejectWithValue }) => {
        if (!dataAgendamento) {
            return rejectWithValue('A data do agendamento é obrigatória.');
        }

        const novoServico = {
            nome: profissional.nome,
            tipo: profissional.tipo,
            profissionalId: profissional.id,
            data: dataAgendamento,
            // Status inicial:
            avaliacao: null, 
            avaliacaoGeral: null,
            icon: 'calendar-check'
        };

        try {
            const response = await axios.post('http://localhost:3001/servicos', novoServico);
            return response.data;
        } catch (error) {
            return rejectWithValue('Não foi possível registrar o serviço.');
        }
    }
);

// NOVA THUNK: Atualiza um serviço existente com uma avaliação.
export const enviarAvaliacao = createAsyncThunk(
    'servicosContratados/enviarAvaliacao',
    async ({ id, avaliacao, nota }, { rejectWithValue }) => {
        try {
            // PATCH atualiza apenas os campos enviados
            const response = await axios.patch(`http://localhost:3001/servicos/${id}`, {
                avaliacao: avaliacao,
                avaliacaoGeral: nota
            });
            return response.data;
        } catch (error) {
            return rejectWithValue('Falha ao enviar avaliação.');
        }
    }
);
    export const cancelarServico = createAsyncThunk(
    'servicosContratados/cancelarServico',
    async (servicoId, { rejectWithValue }) => {
        try {
            // A requisição DELETE não precisa de corpo, apenas da URL com o ID.
            await axios.delete(`http://localhost:3001/servicos/${servicoId}`);
            // Retorna o ID para que possamos removê-lo do nosso estado.
            return servicoId;
        } catch (error) {
            return rejectWithValue('Não foi possível cancelar o serviço.');
        }
    }
);

// O estado inicial agora usa o adapter e controla status da API.
const initialState = servicesAdapter.getInitialState({
    status: 'idle', 
    error: null,
    avaliacoesVisiveis: {} ,
    actionStatus: { type: null, servicoId: null, status: 'idle' } 
});

const servicosContratadosSlice = createSlice({
    name: 'servicosContratados',
    initialState,
    reducers: {

        toggleAvaliacaoVisivel: (state, action) => {
            const id = action.payload;
            state.avaliacoesVisiveis[id] = !state.avaliacoesVisiveis[id];
        },
        clearServicosError: (state) => {
            state.error = null;
        },
         resetActionStatus: (state) => {
            state.actionStatus = { type: null, servicoId: null, status: 'idle' };
        }
    },
    // extraReducers lida com as ações das thunks.
    extraReducers: (builder) => {
        builder
            // Casos para fetchServicos
            .addCase(fetchServicos.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchServicos.fulfilled, (state, action) => {
            state.status = 'succeeded';
            servicesAdapter.setAll(state, action.payload);
        })
        .addCase(fetchServicos.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
            .addCase(contratarServico.pending, (state, action) => {
            state.actionStatus = { type: 'contratar', profissionalId: action.meta.arg.profissional.id, status: 'loading' };
        })
        .addCase(contratarServico.fulfilled, (state, action) => { // <-- Apenas uma vez, com a lógica unificada
            state.actionStatus = { status: 'succeeded' };
            servicesAdapter.addOne(state, action.payload);
        })
        .addCase(contratarServico.rejected, (state, action) => {
            state.actionStatus = { status: 'failed' };
            state.error = action.payload;
        })

            // Atualiza o serviço que foi avaliado no estado.
            .addCase(enviarAvaliacao.fulfilled, (state, action) => {
                servicesAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload
                });
            })
            .addCase(cancelarServico.pending, (state, action) => {
            state.actionStatus = { type: 'cancelar', servicoId: action.meta.arg, status: 'loading' };
        })
        .addCase(cancelarServico.fulfilled, (state, action) => { // <-- Apenas uma vez, com a lógica unificada
            state.actionStatus = { status: 'succeeded' };
            servicesAdapter.removeOne(state, action.payload);
        })
        .addCase(cancelarServico.rejected, (state, action) => {
            state.actionStatus = { status: 'failed' };
            state.error = action.payload;
        })   
             
    }
});

export const { toggleAvaliacaoVisivel, clearServicosError,  resetActionStatus} = servicosContratadosSlice.actions;

// Exporta os seletores gerados pelo adapter.
export const {
    selectAll: selectAllServicos,
    selectById: selectServicoById,
    selectIds: selectServicoIds,
} = servicesAdapter.getSelectors(state => state.servicosContratados);


export default servicosContratadosSlice.reducer;