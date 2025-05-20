import { Routes, Route } from "react-router-dom";
import TelaInicial from "./TelaInicial";
import TelaBusca from "./TelaBusca";
import ProfsFiltrados from "./ProfsFiltrados";
import ProfissionalDetalhes from "./ProfissionalDetalhes";
import SobreNos from "./SobreNos";
import ServicosContratados from "./ServicosContratados";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/buscar" element={<TelaBusca />} />
          <Route path="/profs-filtrados" element={<ProfsFiltrados />} />
          <Route path="/profissional/:id" element={<ProfissionalDetalhes />} />
          <Route
            path="/servicos-contratados"
            element={<ServicosContratados />}
          />
          <Route path="/sobre-nos" element={<SobreNos />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
