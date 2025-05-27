import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showWelcomeMessage: true, 
  lastButtonClicked: null, // Rastrear última ação do usuário
};

const telaInicialSlice = createSlice({
  name: 'telaInicial',
  initialState,
  reducers: {
    toggleWelcome: (state) => {
      state.showWelcomeMessage = !state.showWelcomeMessage;
    },
    setLastButtonClicked: (state, action) => {
      state.lastButtonClicked = action.payload;
    },
  },
});

export const { toggleWelcome, setLastButtonClicked } = telaInicialSlice.actions;
export default telaInicialSlice.reducer;