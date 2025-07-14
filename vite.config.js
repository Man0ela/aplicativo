import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // O proxy deve estar DENTRO de um objeto 'proxy'
    proxy: {
      // Redireciona requisições de /api para o seu backend
      '/api': {
        target: 'http://localhost:3001', // A porta do seu backend
        changeOrigin: true,
        secure: false,      
      }
    }
  }
});