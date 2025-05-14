import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import TelaInicial from "./TelaInicial";
import TelaBusca from "./TelaBusca";
import ProfsFiltrados from "./ProfsFiltrados";
import ProfissionalDetalhes from "./ProfissionalDetalhes";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from "./Footer";


function App() {
  return (
    <>
    <Header/>
    
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/buscar" element={<TelaBusca />} />
      <Route path="/profs-filtrados" element={<ProfsFiltrados />} />
      <Route path="/profissional/:id" element={<ProfissionalDetalhes />} />
    </Routes>
    <Footer/></>
  );
}

export default App;
