import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const RedesSociais = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Redes Sociais</h1>
      <p>
        Siga-nos nas redes sociais para ficar por dentro das novidades e
        promoções!
      </p>

      <div className="d-flex gap-4 fs-1 text-primary">
        <a
          href="https://www.instagram.com/getservice"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="bi bi-instagram"></i>
        </a>
        <a
          href="https://www.facebook.com/getservice"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="bi bi-facebook"></i>
        </a>
        <a
          href="https://twitter.com/getservice"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <i className="bi bi-twitter"></i>
        </a>
      </div>
    </div>
  );
};

export default RedesSociais;
