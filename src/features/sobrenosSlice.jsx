// slices/sobreNosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  titulo: 'Conheça a GetService',
  descricao: 'Somos a plataforma que conecta profissionais qualificados de serviços terceirizados com usuários que buscam qualidade, confiança e agilidade.',
  itens: [
    {
      id: 1,
      icon: 'bounding-box-circles',
      titulo: 'Diversidade de Serviços',
      texto: 'Oferecemos profissionais de faxina, jardinagem, piscineiro e muito mais.'
    },
    {
      id: 2,
      icon: 'people-fill',
      titulo: 'Profissionais Confiáveis',
      texto: 'Todos os prestadores passam por um processo rigoroso de seleção.'
    },
    {
      id: 3,
      icon: 'clipboard-check',
      titulo: 'Facilidade para Contratar',
      texto: 'Nossa plataforma simplifica o processo para encontrar e contratar serviços.'
    }
  ]
};

const sobreNosSlice = createSlice({
  name: 'sobreNos',
  initialState,
  reducers: {}
});

export default sobreNosSlice.reducer;
