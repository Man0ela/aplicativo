import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS aqui também

const Header = () => {
  return (
    <header className="d-flex justify-content-between align-items-md-center pb-3 mb-5 border-bottom">
      <h1 className="h4">
        <Link
          to="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          {/* SVG permanece igual */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-bootstrap-fill d-inline-block me-2"
            viewBox="0 0 16 16"
          >
            {/* Código do SVG */}
          </svg>
          <span>React</span>
        </Link></h1>
        <ul className="nav nav-pills">
              <li className="nav-item">
                <button onClick= {() => navigate("/login")} className="nav-link active">
                  Login</button>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Segurança
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Entrar como profissional
                </a>
              </li>
            </ul>
             <a href="/servicos-contratados" className="text-decoration-none">
              <i className="bi bi-person-circle fs-3"></i>
            </a>
      <a
        href="https://github.com/twbs/examples/tree/main/react-nextjs/"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub
      </a>
    </header>
  );
};

export default Header;