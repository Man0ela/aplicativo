import { Routes, Route } from "react-router-dom";
import TelaInicial from "./TelaInicial";
import TelaBusca from "./TelaBusca";
import ProfsFiltrados from "./ProfsFiltrados";
import ProfissionalDetalhes from "./ProfissionalDetalhes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/buscar" element={<TelaBusca />} />
      <Route path="/profs-filtrados" element={<ProfsFiltrados />} />
      <Route path="/profissional/:id" element={<ProfissionalDetalhes />} />
    </Routes>
  );
}

export default App;
