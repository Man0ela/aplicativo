import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/SobreNos.module.css";

const SobreNos = () => {
  const navigate = useNavigate();

  return (
    <div className={`container py-5 ${styles.sobreContainer}`}>
      <h1 className="mb-4 text-center fw-bold">Conheça a GetService</h1>
      <p className="lead text-center mb-5">
        Somos a plataforma que conecta profissionais qualificados de serviços
        terceirizados com usuários que buscam qualidade, confiança e agilidade.
      </p>

      <div className="row gy-4">
        <div className="col-md-4 text-center">
          <i
            className={`bi bi-bounding-box-circles fs-1 mb-3 ${styles.icon}`}
          />
          <h3 className="mb-2">Diversidade de Serviços</h3>
          <p>
            Oferecemos profissionais de faxina, jardinagem, piscineiro e muito
            mais.
          </p>
        </div>
        <div className="col-md-4 text-center">
          <i className={`bi bi-people-fill fs-1 mb-3 ${styles.icon}`} />
          <h3 className="mb-2">Profissionais Confiáveis</h3>
          <p>
            Todos os prestadores passam por um processo rigoroso de seleção.
          </p>
        </div>
        <div className="col-md-4 text-center">
          <i className={`bi bi-clipboard-check fs-1 mb-3 ${styles.icon}`} />
          <h3 className="mb-2">Facilidade para Contratar</h3>
          <p>
            Nossa plataforma simplifica o processo para encontrar e contratar
            serviços.
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/buscar")}
        >
          Encontre um profissional agora
        </button>
      </div>
    </div>
  );
};

export default SobreNos;
