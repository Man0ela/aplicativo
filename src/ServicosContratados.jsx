import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectAllServicos,
    fetchServicos,
    enviarAvaliacao, 
    toggleAvaliacaoVisivel
} from './features/servicosSlice';


const FormularioAvaliacao = ({ servicoId }) => {
    const dispatch = useDispatch();
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(enviarAvaliacao({ id: servicoId, avaliacao: comentario, nota }));
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

const ServicosContratados = () => {
    const dispatch = useDispatch();
    
    const servicos = useSelector(selectAllServicos);
    const status = useSelector(state => state.servicosContratados.status);
    const [servicoParaAvaliar, setServicoParaAvaliar] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchServicos());
        }
    }, [status, dispatch]);
    
    if (status === 'loading') {
        return <div className="container my-4 text-center">Carregando histórico...</div>;
    }

    return (
        <div className="container my-4">
            <h2 className="mb-4">Histórico de Serviços</h2>
            <div className="row">
                {servicos.map(servico => (
                    <div className="col-md-6 col-lg-4 mb-4" key={servico.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <i className={`bi bi-${servico.icon} me-2`} style={{ fontSize: '1.5rem' }}></i>
                                    <h5 className="card-title mb-0">{servico.nome}</h5>
                                </div>
                                <p className="card-text"><strong>Data:</strong> {new Date(servico.data).toLocaleDateString()}</p>
                                
                                {servico.avaliacao ? (
                                    // Se JÁ EXISTE avaliação, mostra
                                    <div>
                                        <p className="card-text mb-1"><strong>Sua Avaliação:</strong> {servico.avaliacaoGeral} ★</p>
                                        <p className="card-text fst-italic">"{servico.avaliacao}"</p>
                                    </div>
                                ) : (
                                    // Se NÃO EXISTE avaliação, mostra o botão para avaliar
                                    <div>
                                        <p className="text-muted">Serviço concluído. Deixe sua avaliação.</p>
                                        <button className="btn btn-primary btn-sm" onClick={() => setServicoParaAvaliar(servico.id)}>
                                            Avaliar Serviço
                                        </button>
                        
                                        {servicoParaAvaliar === servico.id && <FormularioAvaliacao servicoId={servico.id} />}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicosContratados;