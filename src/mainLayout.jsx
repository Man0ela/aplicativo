import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Verifique o caminho
import Footer from './Footer'; // Verifique o caminho

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      {/* O <Outlet> é um espaço reservado onde o React Router irá renderizar a rota filha */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;