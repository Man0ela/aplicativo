import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import TelaInicial from "./TelaInicial";
import TelaBusca from "./TelaBusca";
import ProfsFiltrados from "./ProfsFiltrados";
import ProfissionalDetalhes from "./ProfissionalDetalhes";
import SobreNos from "./SobreNos";
import ServicosContratados from "./ServicosContratados";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import DashboardProfissional from "./DashboardProfissional";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const location = useLocation();

  // Aqui a condição que verifica se está na tela de login
  const isLoginPage = location.pathname === '/';

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Só mostra Header se não estiver na tela de login */}
      {!isLoginPage && <Header />}

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Rotas para usuário cliente */}
          <Route path="/inicial" element={<TelaInicial />} />
          <Route path="/buscar" element={<TelaBusca />} />
          <Route path="/profs-filtrados" element={<ProfsFiltrados />} />
          <Route path="/profissional/:id" element={<ProfissionalDetalhes />} />
          <Route path="/servicos-contratados" element={<ServicosContratados />} />
          <Route path="/sobre-nos" element={<SobreNos />} />

          {/* Dashboard para profissional */}
          <Route path="/dashboard-profissional" element={<DashboardProfissional />} />

          {/* Redirecionamento para login em rotas não reconhecidas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Só mostra Footer se não estiver na tela de login */}
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;

}

export default App;
