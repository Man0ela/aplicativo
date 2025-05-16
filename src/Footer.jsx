// src/components/Footer/Footer.jsx
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/Footer.module.css';

const footerItems = [
  {
    icon: '#collection',
    title: 'Redes Sociais',
    text: 'Siga-nos no Instagram, Facebook e Twitter para não perder nenhuma novidade.',
    to: '/social'
  },
  {
    icon: '#people-circle',
    title: 'Contato',
    text: 'Envie um email ou ligue para nossa equipe de suporte.',
    to: '/contact'
  },
  {
    icon: '#toggles2',
    title: 'Sobre Nós',
    text: 'Conheça a nossa missão, visão e equipe por trás da SuaEmpresa.',
    to: '/'
  }
];

const Footer = () => (
  <footer className={styles.footer}>
    <div className={`container px-2 py-2 ${styles.content}`}>
      <h2 className={`${styles.title} pb-1 border-bottom`}>Mais sobre nós</h2>
      <div className="row g-3 row-cols-3">
        {footerItems.map(({ icon, title, text, to }, idx) => (
          <div key={idx} className="col">
            <div
              className={`${styles.featureIcon} d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3`}
            >
              <svg className="bi" width="1em" height="1em" aria-hidden="true">
                <use xlinkHref={icon} />
              </svg>
            </div>
            <h3 className="fs-5 text-body-emphasis mb-2">{title}</h3>
            <p className="mb-2">{text}</p>
            <Link to={to} className={styles.link}>
              Saiba mais
              <svg className="bi ms-1" aria-hidden="true">
                <use xlinkHref="#chevron-right" />
              </svg>
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

export default Footer;