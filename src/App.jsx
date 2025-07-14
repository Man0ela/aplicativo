import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./mainLayout"; // Importa nosso novo layout


import Login from "./Login";
import Cadastro from "./Cadastro";
import TelaInicial from "./TelaInicial";
import TelaBusca from "./TelaBusca";
import ProfsFiltrados from "./ProfsFiltrados";
import ServicosContratados from "./ServicosContratados";
import SobreNos from "./SobreNos";
import DashboardProfissional from "./DashboardProfissional";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />


      {/* Rotas privadas/principais que USAM o layout com Header e Footer */}
      <Route element={<MainLayout />}>
        <Route path="/inicial" element={<TelaInicial />} />
        <Route path="/buscar" element={<TelaBusca />} />
        <Route path="/profs-filtrados" element={<ProfsFiltrados />} />
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
