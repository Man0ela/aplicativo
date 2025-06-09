import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLastButtonClicked, toggleWelcome } from "./features/telainicialSlice";
import "bootstrap/dist/css/bootstrap.min.css";

function TelaInicial() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showWelcomeMessage, lastButtonClicked } = useSelector(
    (state) => state.telaInicial
  );

  const IMG = process.env.PUBLIC_URL + "/images/prestador-de-servicos.png";

  // Função para navegar e registrar a ação no Redux
  const handleNavigation = (path, buttonName) => {
    dispatch(setLastButtonClicked(buttonName));
    navigate(path);
  };

  return (
    <div className="page-container">
      {/* Mensagem de boas‑vindas */}
      {showWelcomeMessage && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <div>Bem‑vindo ao GetService! Clique nos botões abaixo para começar.</div>
          <button
            type="button"
            className="btn-close"
            aria-label="Fechar"
            onClick={() => dispatch(toggleWelcome())}
          />
        </div>
      )}

      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={IMG}
              className="d-block mx-lg-auto img-fluid"
              alt="Prestador de Serviços"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Aqui você encontra o que precisa
            </h1>
            <p className="lead">
              Rápido e seguro, encontre diversos terceirizados capacitados para
              te atender em todo o país.
            </p>
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
            {/* Exibe a última ação */}
            {lastButtonClicked && (
              <p className="mt-4 text-muted">
                Última ação: <strong>{lastButtonClicked}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
