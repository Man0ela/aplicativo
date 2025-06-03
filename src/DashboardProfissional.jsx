import React from 'react';
import { useSelector } from 'react-redux';

const cardStyle = {
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  padding: '20px',
  marginBottom: '20px',
  transition: 'transform 0.2s',
};

const containerStyle = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '0 20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#333',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '40px',
  color: '#2c3e50',
};

const sectionTitleStyle = {
  fontSize: '1.8rem',
  borderBottom: '3px solid #2980b9',
  paddingBottom: '8px',
  marginBottom: '20px',
};

const cardHover = {
  cursor: 'pointer',
  transform: 'scale(1.02)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
};

const infoLabel = {
  fontWeight: '600',
  color: '#555',
  marginRight: '6px',
};

const ratingStyle = {
  color: '#f39c12',
  fontWeight: '700',
};

const emptyMessageStyle = {
  fontStyle: 'italic',
  color: '#999',
};

export default function DashboardProfissional() {
  const { historicoServicos, solicitacoesServicos } = useSelector(
    (state) => state.dashboardProfissional
  );

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Dashboard Profissional</h1>

      <section>
        <h2 style={sectionTitleStyle}>Histórico de Serviços</h2>
        {historicoServicos.length === 0 ? (
          <p style={emptyMessageStyle}>Nenhum serviço realizado ainda.</p>
        ) : (
          historicoServicos.map((servico) => (
            <div
              key={servico.id}
              style={cardStyle}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <p>
                <span style={infoLabel}>Cliente:</span> {servico.cliente}
              </p>
              <p>
                <span style={infoLabel}>Data:</span>{' '}
                {new Date(servico.data).toLocaleDateString('pt-BR')}
              </p>
              <p>
                <span style={infoLabel}>Avaliação:</span>{' '}
                <span style={ratingStyle}>{servico.avaliacao} ⭐</span>
              </p>
              <p>
                <span style={infoLabel}>Descrição:</span> {servico.descricao}
              </p>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Solicitações de Serviços</h2>
        {solicitacoesServicos.length === 0 ? (
          <p style={emptyMessageStyle}>Sem solicitações pendentes.</p>
        ) : (
          solicitacoesServicos.map((solicitacao) => (
            <div
              key={solicitacao.id}
              style={cardStyle}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <p>
                <span style={infoLabel}>Cliente:</span> {solicitacao.cliente}
              </p>
              <p>
                <span style={infoLabel}>Data:</span>{' '}
                {new Date(solicitacao.data).toLocaleDateString('pt-BR')}
              </p>
              <p>
                <span style={infoLabel}>Descrição:</span> {solicitacao.descricao}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
