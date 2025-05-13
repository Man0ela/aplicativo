import React from "react";
import cx from 'classnames';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/style3.module.css";

function TelaInicial() {
  const navigate = useNavigate();
  const IMG ="./images/prestador-de-servicos.png";

  return (
    <>
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
                onClick={() => navigate("/buscar")}
              >
                Quero um profissional
              </button>
              <button className="btn btn-outline-secondary btn-lg px-4">
                Saiba mais
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TelaInicial;
