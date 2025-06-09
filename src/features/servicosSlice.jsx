import { createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';
import * as Yup from 'yup';

// 1. Validação com Yup: Define as regras para um novo serviço.
const servicoSchema = Yup.object({
    nome: Yup.string().required('O nome do serviço é obrigatório.'),
    tipo: Yup.string().required('O tipo de serviço é obrigatório.'),
    data: Yup.date().required('A data é obrigatória.').typeError('Formato de data inválido.'),
    avaliacao: Yup.string().required('A avaliação é obrigatória.').min(10, 'A avaliação deve ter no mínimo 10 caracteres.'),
    icon: Yup.string().default('tools'), // Valor padrão se não for fornecido
});

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

// O estado inicial agora usa o adapter e controla status da API.
const initialState = servicesAdapter.getInitialState({
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    avaliacoesVisiveis: {} // Mantemos o estado da UI
});

const servicosContratadosSlice = createSlice({
    name: 'servicosContratados',
    initialState,
    reducers: {
        // A lógica de UI permanece a mesma.
        toggleAvaliacaoVisivel: (state, action) => {
            const id = action.payload;
            state.avaliacoesVisiveis[id] = !state.avaliacoesVisiveis[id];
        },
        clearServicosError: (state) => {
            state.error = null;
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
                // Usa o adapter para popular o estado de forma normalizada.
                servicesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchServicos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(contratarServico.fulfilled, (state, action) => {
                servicesAdapter.addOne(state, action.payload);
                // Você pode adicionar uma notificação de sucesso aqui se quiser
            })

            // Atualiza o serviço que foi avaliado no estado.
            .addCase(enviarAvaliacao.fulfilled, (state, action) => {
                servicesAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload
                });
            });
            
    }
});

export const { toggleAvaliacaoVisivel, clearServicosError } = servicosContratadosSlice.actions;

// 4. Exporta os seletores gerados pelo adapter.
export const {
    selectAll: selectAllServicos,
    selectById: selectServicoById,
    selectIds: selectServicoIds,
} = servicesAdapter.getSelectors(state => state.servicosContratados);


export default servicosContratadosSlice.reducer;