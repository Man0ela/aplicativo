import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logoText: 'GetService',
  navLinks: [
    { label: 'Login', type: 'button', active: true, to:'/login' },
    { label: 'Profissional', type: 'link', active: false, to: '/buscar' },
    { label: 'Histórico', type: 'link', active: false, to: '/historico' }
  ]
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setLogoText: (state, action) => {
      state.logoText = action.payload;
    },
    setNavLinks: (state, action) => {
      state.navLinks = action.payload;
    },
    setActiveNavLink: (state, action) => {
      state.navLinks = state.navLinks.map(link => ({
        ...link,
        active: link.label === action.payload
      }));
    }
  }
});

export const { setLogoText, setNavLinks, setActiveNavLink } = headerSlice.actions;

export default headerSlice.reducer;
