import MainLayout from "./mainLayout";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { loadUserFromToken } from "./features/authSlice";
import Login from "./Login";
import Cadastro from "./Cadastro";
import TelaInicial from "./TelaInicial";
import TelaBusca from "./TelaBusca";
import ProfsFiltrados from "./ProfsFiltrados";
import ServicosContratados from "./ServicosContratados";
import SobreNos from "./SobreNos";
import DashboardProfissional from "./DashboardProfissional";
import ProtectedRoute from "./ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<MainLayout />}>
        {/* Rotas protegidas */}
        <Route
          path="/inicial"
          element={
            <ProtectedRoute>
              <TelaInicial />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buscar"
          element={
            <ProtectedRoute>
              <TelaBusca />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profs-filtrados"
          element={
            <ProtectedRoute>
              <ProfsFiltrados />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historico"
          element={
            <ProtectedRoute>
              <ServicosContratados />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-profissional"
          element={
            <ProtectedRoute>
              <DashboardProfissional />
            </ProtectedRoute>
          }
        />
        {/* Página pública */}
        <Route path="/sobre-nos" element={<SobreNos />} />
      </Route>

      {/* Redirecionamento de fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
