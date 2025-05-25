import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [
    {
      id: 1,
      icon: 'tools',
      nome: 'Manutenção do Site',
      tipo: 'Web',
      avaliacaoGeral: '4.8',
      data: '10/04/2025',
      avaliacao: 'Serviço excelente, muito profissional e rápido. Recomendo!'
    },
    {
      id: 2,
      icon: 'phone',
      nome: 'Suporte Técnico',
      tipo: 'TI',
      avaliacaoGeral: '4.5',
      data: '22/03/2025',
      avaliacao: 'Ajuda muito rápida e eficiente, resolveram todos os meus problemas.'
    },
    {
      id: 3,
      icon: 'laptop',
      nome: 'Desenvolvimento de Aplicativo',
      tipo: 'Desenvolvimento',
      avaliacaoGeral: '4.9',
      data: '15/02/2025',
      avaliacao: 'O aplicativo ficou ótimo e o desenvolvedor manteve ótima comunicação.'
    }
  ],
  avaliacoesVisiveis: {}
};

const servicosContratadosSlice = createSlice({
  name: 'servicosContratados',
  initialState,
  reducers: {
    toggleAvaliacaoVisivel: (state, action) => {
      const id = action.payload;
      state.avaliacoesVisiveis[id] = !state.avaliacoesVisiveis[id];
    }
  }
});

export const { toggleAvaliacaoVisivel } = servicosContratadosSlice.actions;
export default servicosContratadosSlice.reducer;
