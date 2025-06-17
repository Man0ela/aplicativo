import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./mainLayout"; // Importa nosso novo layout

// Importe todas as suas telas
import Login from "./Login";
import Cadastro from "./Cadastro";
import TelaInicial from "./TelaInicial";
import TelaBusca from "./TelaBusca";
import ProfsFiltrados from "./ProfsFiltrados";
import ProfissionalDetalhes from "./ProfissionalDetalhes";
import ServicosContratados from "./ServicosContratados";
import SobreNos from "./SobreNos";
import DashboardProfissional from "./DashboardProfissional";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <Routes>
      {/* GRUPO 1: Rotas públicas que NÃO usam o layout principal */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      
      
      <Route path="/" element={<Navigate to="/cadastro" replace />} />


      {/* GRUPO 2: Rotas privadas/principais que USAM o layout com Header e Footer */}
      <Route element={<MainLayout />}>
        <Route path="/inicial" element={<TelaInicial />} />
        <Route path="/buscar" element={<TelaBusca />} />
        <Route path="/profs-filtrados" element={<ProfsFiltrados />} />
        <Route path="/profissional/:id" element={<ProfissionalDetalhes />} />
        <Route path="/historico" element={<ServicosContratados />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/dashboard-profissional" element={<DashboardProfissional />} />
      </Route>

      {/* Qualquer outra rota não encontrada pode redirecionar para o login também */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;