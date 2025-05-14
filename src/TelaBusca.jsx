import React, { useState } from "react";
import cx from 'classnames';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/style3.module.css";

function TelaBusca() {
  const [tipoServico, setTipoServico] = useState("");
  const navigate = useNavigate();

  const buscarProfissionais = () => {
    if (tipoServico.trim() === "") return alert("Digite o tipo de serviço.");
    navigate(`/profs-filtrados?tipo=${encodeURIComponent(tipoServico)}`);
  };

  return (
    <>
      <div className={cx(styles.container2)}>
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
