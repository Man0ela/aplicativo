import { configureStore } from '@reduxjs/toolkit';
import buscaReducer from './features/buscaSlice.jsx';
import telainicialReducer from './features/telainicialSlice';
import profissionaisReducer from './features/profsFiltradosSlice';
import profdetalhesReducer from './features/profDetalhesSlice';
import footerReducer from "./features/footerSlice.jsx";
import headerReducer from "./features/headerSlice.jsx";
import SobreNosReducer from './features/sobrenosSlice.jsx';
import ServicosReducer from './features/servicosSlice.jsx';
import usersReducer from './features/usersSlice';
import dashboardProfissionalReducer from './features/dashboardProfissionalSlice.jsx';

// Configure a store com o slice
export const store = configureStore({
  reducer: {
    busca: buscaReducer,
    telaInicial: telainicialReducer, 
    profissionais: profissionaisReducer,
    profdetalhes: profdetalhesReducer,
    footer: footerReducer,
    header: headerReducer,
    sobreNos: SobreNosReducer,
    servicosContratados: ServicosReducer,
    dashboardProfissional:dashboardProfissionalReducer,
    users:usersReducer,
  }
});
