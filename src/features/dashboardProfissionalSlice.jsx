import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  historicoServicos: [
    { id: 1, cliente: 'Maria', data: '2025-05-01', avaliacao: 5, descricao: 'Limpeza geral' },
    { id: 2, cliente: 'João', data: '2025-05-03', avaliacao: 4, descricao: 'Jardinagem' },
  ],
  solicitacoesServicos: [
    { id: 3, cliente: 'Ana', data: '2025-06-05', descricao: 'Conserto elétrico' }
  ],
};

const dashboardProfissionalSlice = createSlice({
  name: 'dashboardProfissional',
  initialState,
  reducers: {

  },
});

export default dashboardProfissionalSlice.reducer;
