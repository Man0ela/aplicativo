// footerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      iconClass: 'bi-share',
      title: 'Redes Sociais',
      text: 'Siga-nos no Instagram, Facebook e Twitter para não perder nenhuma novidade.',
      to: '/social'
    },
    {
      iconClass: 'bi-envelope',
      title: 'Contato',
      text: 'Envie um email ou ligue para nossa equipe de suporte.',
      to: '/contact'
    },
    {
      iconClass: 'bi-info-circle',
      title: 'Sobre Nós',
      text: 'Conheça a nossa missão, visão e equipe por trás da SuaEmpresa.',
      to: '/'
    }
  ]
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {}
});

export default footerSlice.reducer;
