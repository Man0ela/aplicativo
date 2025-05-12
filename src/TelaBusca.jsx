import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/style1.module.css";

function TelaBusca() {
  const [tipoServico, setTipoServico] = useState("");
  const navigate = useNavigate();

  const buscarProfissionais = () => {
    if (tipoServico.trim() === "") return alert("Digite o tipo de serviço.");
    navigate(`/profs-filtrados?tipo=${encodeURIComponent(tipoServico)}`);
  };

  return (
    <>
      <header  className="{styles.header}d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 border-bottom px-4">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Getservices</span>
        </a>
        <ul className="nav nav-pills me-3">
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
              Entre como profissional
            </a>
          </li>
        </ul>
        <a href="/servicos-contratados" className="text-decoration-none">
          <i className="bi bi-person-circle fs-3"></i>
        </a>
      </header>

      <div className="container2 text-center">
        <h1>Buscar Profissionais Terceirizados</h1>
        <label htmlFor="barra-pesquisa">Digite o tipo de serviço:</label>
        <br />
        <div className="input-group mb-3 mx-auto" style={{ maxWidth: "500px" }}>
          <button
            className="btn btn-primary"
            type="button"
            onClick={buscarProfissionais}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <i className="bi bi-search"></i>
          </button>
          <input
            type="text"
            id="barra-pesquisa"
            className="form-control"
            placeholder="Ex: Piscineiro, Faxineira, Jardineiro"
            list="sugestoes-servico"
            value={tipoServico}
            onChange={(e) => setTipoServico(e.target.value)}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          />
        </div>
        <datalist id="sugestoes-servico">
          <option value="Piscineiro" />
          <option value="Faxineira" />
          <option value="Jardineiro" />
        </datalist>
      </div>
    </>
  );
}

export default TelaBusca;
