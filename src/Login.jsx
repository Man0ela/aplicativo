import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (tipoUsuario === 'cliente') {
      navigate('/inicial');
    } else if (tipoUsuario === 'profissional') {
      navigate('/dashboard-profissional');
    } else {
      alert('Selecione uma opção para continuar');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <div className="mb-3">
        <label className="form-label">Tipo de Usuário</label>
        <select 
          className="form-select"
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="cliente">Cliente</option>
          <option value="profissional">Profissional</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
