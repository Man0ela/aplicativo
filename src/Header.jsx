import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="container-fluid mb-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between py-3">
        {/* Logo e título */}
        <Link
          to="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-bootstrap-fill me-2"
            viewBox="0 0 16 16"
          >
            {/* paths aqui */}
          </svg>
          <span className="fs-4">Getservice</span>
        </Link>

        {/* Navegação principal */}
        <ul className="nav nav-pills ms-auto justify-content-between align-items-center">
          <li className="nav-item">
            <button
              className="nav-link active"
            >
              Login
            </button>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              Segurança
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              Profissional
            </Link>
          </li>
        </ul>

        {/* Ações à direita */}
        <div className="d-flex align-items-center">
          <Link
            to="/servicos-contratados"
            className="text-dark text-decoration-none me-3"
          >
            <i className="bi bi-person-circle fs-3"></i>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;