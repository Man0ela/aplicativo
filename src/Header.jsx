import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveNavLink } from "./features/headerSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logoText, navLinks } = useSelector((state) => state.header);

  const handleLogoClick = () => {
    navigate("/login");
    dispatch(setActiveNavLink(""));
  };

  const handleNavClick = (label, to) => {
    dispatch(setActiveNavLink(label));
    if (to) navigate(to);
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <button
        onClick={handleLogoClick}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1.5rem",
          background: "none",
          border: "none",
          color: "#0d6efd",
        }}
        aria-label="Voltar para tela inicial"
      >
        {logoText}
      </button>

      <nav>
        <ul className="nav">
          {navLinks.map(({ label, type, to, active }) => (
            <li key={label} className="nav-item">
              {type === "link" ? (
                <button
                  onClick={() => handleNavClick(label, to)}
                  className={`nav-link btn btn-link ${
                    active ? "active fw-bold" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {label}
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick(label)}
                  className={`btn btn-primary ${
                    active ? "" : "btn-outline-primary"
                  }`}
                >
                  {label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
