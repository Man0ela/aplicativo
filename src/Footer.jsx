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
    text: 'Envie um e‑mail ou ligue para nossa equipe de suporte.',
    to: '/contact'
  },
  {
    icon: '#toggles2',
    title: 'Sobre Nós',
    text: 'Conheça a nossa missão, visão e equipe por trás da SuaEmpresa.',
    to: '/about'
  }
];

const Footer = () => (
  <footer className={styles.footer}>
    <div className={`container px-2 py-2 ${styles.content}`} id="featured-3">
      <h2 className={`${styles.title} pb-1 border-bottom`}>Columns with icons</h2>
      {/* Em mobile: 2 colunas; em desktop: 3 colunas */}
      <div className="row g-3 row-cols-3 row-cols-lg-3">
        {[
          { icon: '#collection', title: 'Redes Sociais', to: '/social' },
          { icon: '#people-circle', title: 'Contato' },
          { icon: '#toggles2', title: 'Sobre nós', to: '/' },
        ].map(({ icon, title, to }, idx) => (
          <div key={idx} className="col">
            <div className={`${styles.featureIcon} d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3`}>
              <svg className="bi" width="1em" height="1em" aria-hidden="true">
                <use xlinkHref={icon} />
              </svg>
            </div>
            <h3 className="fs-5 text-body-emphasis mb-2">{title}</h3>
            <p className="mb-2">
              Informação adicional sobre {title.toLowerCase()}.
            </p>
            <Link to={to} className={styles.link}>
              Saiba mais
n              <svg className="bi ms-1" aria-hidden="true">
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