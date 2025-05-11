import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function TelaInicial() {
  const navigate = useNavigate();
  const urlIMG =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQ8005JKs5fpNf1g0v6AfL8p1n38q5tGg4xMb2CYRs-KIZ4Je";

  return (
    <>
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Getservices</span>
        </a>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="#" className="nav-link active">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Segurança
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Entrar como profissional
            </a>
          </li>
        </ul>
      </header>

      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={urlIMG}
              className="d-block mx-lg-auto img-fluid"
              alt="Prestador de Serviços"
              width="700"
              height="500"
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
