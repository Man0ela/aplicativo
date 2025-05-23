import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLastButtonClicked } from "./features/telainicialSlice"; // Importe a action
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/style3.module.css";

function TelaInicial() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Acesse o estado do Redux se necessário
  const { lastButtonClicked } = useSelector((state) => state.telaInicial);
  
  const IMG = "./images/prestador-de-servicos.png";

  // Função para navegar e registrar a ação no Redux
  const handleNavigation = (path, buttonName) => {
    dispatch(setLastButtonClicked(buttonName)); // Dispara a action
    navigate(path);
  };

  return (
    <div className="page-container">
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          {/* ... (código existente da imagem) ... */}
          <div className="col-lg-6">
            {/* ... (código existente do título e parágrafo) ... */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                className="btn btn-primary btn-lg px-4 me-md-2"
                onClick={() => handleNavigation("/buscar", "profissional")}
              >
                Quero um profissional
              </button>
              <button
                className="btn btn-outline-secondary btn-lg px-4"
                onClick={() => handleNavigation("/sobre-nos", "saiba_mais")}
              >
                Saiba mais
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;