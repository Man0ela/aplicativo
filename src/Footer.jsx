// src/components/Footer/Footer.jsx
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './css/Footer.module.css';

const footerItems = [
  { iconClass: 'bi-share',       title: 'Redes Sociais', text: 'Siga-nos no Instagram, Facebook e Twitter para não perder nenhuma novidade.', to: '/social' },
  { iconClass: 'bi-envelope',    title: 'Contato',       text: 'Envie um email ou ligue para nossa equipe de suporte.',                      to: '/contact' },
  { iconClass: 'bi-info-circle', title: 'Sobre Nós',     text: 'Conheça a nossa missão, visão e equipe por trás da SuaEmpresa.',            to: '/' }
];

const Footer= () => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={`container px-2 py-2 ${styles.content}`}>
        <h2 className={`${styles.title} pb-1 border-bottom`}>Mais sobre nós</h2>
        <div className="row g-3 row-cols-3">
          {footerItems.map(({ iconClass, title, text, to }, idx) => (
            <div key={idx} className="col">
              <div
                className={`${styles.featureIcon} d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient mb-3`}
              >
                {/* Ícone renderizado como fonte */}
                <i className={`bi ${iconClass} fs-2`} aria-hidden="true"></i>
              </div>
              <h3 className="fs-5 text-body-emphasis mb-2">{title}</h3>
              <p className="mb-2">{text}</p>
              <Link to={to} className={styles.link}>
                Saiba mais
                <i className="bi bi-chevron-right ms-1" aria-hidden="true"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        © {new Date().getFullYear()} Getservice. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
