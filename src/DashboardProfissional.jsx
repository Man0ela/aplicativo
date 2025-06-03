import React from 'react';
import { useSelector } from 'react-redux';

const DashboardProfissional = () => {
  const { historicoServicos, solicitacoesServicos } = useSelector(
    (state) => state.dashboardProfissional
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard Profissional</h1>

      <section style={{ marginBottom: '30px' }}>
        <h2>Histórico de Serviços</h2>
        {historicoServicos.length === 0 ? (
          <p>Nenhum serviço realizado ainda.</p>
        ) : (
          historicoServicos.map(servico => (
            <div key={servico.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <p><strong>Cliente:</strong> {servico.cliente}</p>
              <p><strong>Data:</strong> {new Date(servico.data).toLocaleDateString('pt-BR')}</p>
              <p><strong>Avaliação:</strong> {servico.avaliacao} ⭐</p>
              <p><strong>Descrição:</strong> {servico.descricao}</p>
            </div>
          ))
        )}
      </section>

      <section>
        <h2>Solicitações de Serviços</h2>
        {solicitacoesServicos.length === 0 ? (
          <p>Sem solicitações pendentes.</p>
        ) : (
          solicitacoesServicos.map(solicitacao => (
            <div key={solicitacao.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <p><strong>Cliente:</strong> {solicitacao.cliente}</p>
              <p><strong>Data:</strong> {new Date(solicitacao.data).toLocaleDateString('pt-BR')}</p>
              <p><strong>Descrição:</strong> {solicitacao.descricao}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default DashboardProfissional;
