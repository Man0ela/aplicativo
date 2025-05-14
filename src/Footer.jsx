import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const Footer = () => {
  return (
    <footer>
      <hr className="mt-5 mb-4" />
      <p className="text-muted">
        Created and open sourced by the Bootstrap team. Licensed MIT.
      </p>
    </footer>
  );
};

export default Footer;