import React, { useEffect, useState } from 'react';
// A importação de 'react-redux' está correta aqui
import { useSelector, useDispatch } from 'react-redux'; 
import { 
    selectAllServicos,
    fetchServicos,
    enviarAvaliacao,
    cancelarServico // 1. Importamos a ação de cancelar que já existe no seu slice
} from './features/servicosSlice';

// --- Componente do Formulário de Avaliação (com correção) ---
// 2. Adicionamos a prop 'onAvaliacaoEnviada'
const FormularioAvaliacao = ({ servicoId, onAvaliacaoEnviada }) => {
    const dispatch = useDispatch();
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(enviarAvaliacao({ id: servicoId, avaliacao: comentario, nota: Number(nota) }));
        
        // 3. AVISO: Após enviar, chamamos a função para notificar o componente pai
        onAvaliacaoEnviada(); 
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3 p-3 border rounded bg-light">
            <div className="mb-2">
                <label className="form-label">Sua nota (de 1 a 5):</label>
                <input type="number" min="1" max="5" value={nota} onChange={e => setNota(e.target.value)} className="form-control form-control-sm" />
            </div>
            <div className="mb-2">
                <label className="form-label">Seu comentário:</label>
                <textarea value={comentario} onChange={e => setComentario(e.target.value)} className="form-control form-control-sm" required></textarea>
            </div>
            <button type="submit" className="btn btn-success btn-sm">Enviar Avaliação</button>
        </form>
    );
};


// --- Componente Principal do Histórico (com correções) ---
const ServicosContratados = () => {
    const dispatch = useDispatch();
    
    const { user } = useSelector(state => state.auth); 
    const servicos = useSelector(selectAllServicos);
    const status = useSelector(state => state.servicosContratados.status);
    const actionStatus = useSelector(state => state.servicosContratados.actionStatus);

    const [servicoParaAvaliar, setServicoParaAvaliar] = useState(null);

    useEffect(() => {
        if (user) {
            dispatch(fetchServicos());
        }
    }, [user, dispatch]);
    
    if (status === 'loading') {
        return <div className="container my-4 text-center">Carregando histórico...</div>;
    }

    return (
        <div className="container my-4">
            <h2 className="mb-4">Histórico de Serviços</h2>
            <div className="row">
                {servicos.map(servico => {
                    const isCanceling = actionStatus.type === 'cancelar' && 
                                        actionStatus.status === 'loading' && 
                                        actionStatus.servicoId === servico.id;

                    return (
                        <div className="col-md-6 col-lg-4 mb-4" key={servico.id}>
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex align-items-center mb-2">
                                        <i className={`bi bi-tools me-2`} style={{ fontSize: '1.5rem' }}></i>
                                        <h5 className="card-title mb-0">{servico.nome}</h5>
                                    </div>
                                    <p className="card-text"><strong>Data:</strong> {new Date(servico.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                                    
                                    <div className="mt-auto">
                                        {servico.avaliacao ? (
                                            // Se JÁ EXISTE avaliação, mostra os detalhes (nenhum botão)
                                            <div>
                                                <p className="card-text mb-1"><strong>Sua Avaliação:</strong> {servico.avaliacaoGeral} ★</p>
                                                <p className="card-text fst-italic">"{servico.avaliacao}"</p>
                                            </div>
                                        ) : (
                                            // Se NÃO EXISTE avaliação, mostra as opções de ação
                                            <div>
                                                {servicoParaAvaliar === servico.id ? (
                                                    // 4. Passamos a função para o formulário
                                                    <FormularioAvaliacao 
                                                        servicoId={servico.id} 
                                                        onAvaliacaoEnviada={() => setServicoParaAvaliar(null)}
                                                    />
                                                ) : (
                                                    // Mostra os botões "Avaliar" e "Cancelar"
                                                    <div className="d-flex gap-2">
                                                        <button className="btn btn-primary btn-sm" onClick={() => setServicoParaAvaliar(servico.id)}>
                                                            Avaliar
                                                        </button>
                                                        <button 
                                                            className="btn btn-danger btn-sm" 
                                                            onClick={() => dispatch(cancelarServico(servico.id))}
                                                            disabled={isCanceling}
                                                        >
                                                            {isCanceling ? 'Cancelando...' : 'Cancelar'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServicosContratados;