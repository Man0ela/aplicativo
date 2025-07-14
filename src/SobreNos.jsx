import React from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SobreNos = () => {
  // Pega os dados do slice do Redux
  const { titulo, descricao, itens } = useSelector((state) => state.sobreNos);

  return (
    <div className="container my-5">
      <h1 className="mb-4">{titulo}</h1>
      <p className="lead">{descricao}</p>

      <div className="row">
        {itens.map(({ id, icon, titulo, texto }) => (
          <div key={id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className={`bi bi-${icon} fs-1 mb-3 text-primary`}></i>
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SobreNos;
