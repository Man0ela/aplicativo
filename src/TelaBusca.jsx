import React from "react";
import cx from 'classnames';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setTipoServico, fetchProfissionais } from './features/buscaSlice';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/style3.module.css";

function TelaBusca() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const tipoServico = useSelector((state) => state.busca.tipoServico);
  const { status } = useSelector((state) => state.busca);

  const handleChange = (e) => {
    dispatch(setTipoServico(e.target.value));
  };

  const buscarProfissionais = () => {
    if (tipoServico.trim() === "") {
      return alert("Digite o tipo de serviço.");
    }

    dispatch(fetchProfissionais(tipoServico))
      .unwrap() // `.unwrap()` permite usar .then() e .catch() e obter o payload ou o erro
      .then(() => {
        // Navega para a página de resultados após a busca bem-sucedida
        navigate(`/profs-filtrados?tipo=${encodeURIComponent(tipoServico)}`);
      })
      .catch(err => {
        // Exibe o erro retornado pela thunk (ex: "Nenhum profissional encontrado")
        alert(`Erro: ${err}`);
      });
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
            // Desabilita o botão enquanto a busca está em andamento
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-search"></i>
            )}
          </button>
          <input
            type="text"
            id="barra-pesquisa"
            className="form-control"
            placeholder="Ex: Piscineiro, Faxineira, Jardineiro"
            list="sugestoes-servico"
            value={tipoServico}
            onChange={handleChange}
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