import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logoText: 'Getservice',
  navLinks: [
    { label: 'Login', type: 'button', active: true },
    { label: 'Segurança', type: 'link', to: '/seguranca' },
    { label: 'Profissional', type: 'link', to: '/profissional' }
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