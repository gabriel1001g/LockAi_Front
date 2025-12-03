import { useState, useEffect, useCallback } from "react";
import { Check, X, AlertCircle } from "lucide-react";
import BotaoVoltar from "../../components/BotaoVoltar";
import AprovacaoModal from "../../components/AprovacaoModal"; // Modal simples

import { useAuth } from "../../contexts/AuthContext";
import MenuGestor from "../../components/menuGestor";

// Use a rota principal sem /api/
const API_URL = "https://lockaiapii-g7egamgghuhrhrej.brazilsouth-01.azurewebsites.net";

// Função utilitária para formatar a data (saída: DD/MM/AAAA HH:MM:SS)
const formatarData = (dataString) => {
    if (!dataString) return 'Data indisponível';
    try {
        const date = new Date(dataString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Formato 24h
        });
    } catch (e) {
        return 'Data inválida';
    }
};

export default function AprovacaoLocacoes() {
    const { token } = useAuth();
    const [loadingId, setLoadingId] = useState(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const [locacoes, setLocacoes] = useState([]);
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState({
        isOpen: false,
        locacao: null,
        action: ''
    });

    // 1. FUNÇÃO PARA BUSCAR DADOS PENDENTES
    const fetchLocacoesPendentes = useCallback(async () => {
        setLoadingPage(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/PropostaLocacao/analise`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setLocacoes([]);
                    return;
                }

                const errorText = await response.text();
                throw new Error(errorText || "Erro ao carregar locações pendentes.");
            }

            const data = await response.json();
            
            // Tratamento do formato $values (padrão de serialização de referência de objeto)
            const listaLocacoes = Array.isArray(data) ? data : data.$values || [];

            setLocacoes(listaLocacoes);

        } catch (err) {
            console.error("Erro ao carregar locações:", err);
            setError("Falha ao carregar as solicitações. Verifique a conexão ou a API.");
        } finally {
            setLoadingPage(false);
        }
    }, [token]);

    // 2. CARREGA OS DADOS AO INICIAR
    useEffect(() => {
        fetchLocacoesPendentes();
    }, [fetchLocacoesPendentes]);

    // 3. APROVAÇÃO E RECUSA USAM UM MODAL SIMPLES PARA CONFIRMAÇÃO
    const handleAbrirModal = (locacao, actionType) => {
        setModalState({
            isOpen: true,
            locacao: locacao,
            action: actionType 
        });
    };

    // 4. FUNÇÃO DE APROVAÇÃO (PUT)
    const confirmarAprovacao = async (idProposta) => {
        setModalState({ isOpen: false, locacao: null });
        setLoadingId(idProposta);

        try {
            const response = await fetch(
                `${API_URL}/PropostaLocacao/aprovar/${idProposta}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Erro ao aprovar.");
            }

            alert("Locação aprovada com sucesso!");

            fetchLocacoesPendentes();
        } catch (error) {
            console.error("Erro na aprovação:", error);
            alert(`Erro ao aprovar: ${error.message}`);
        } finally {
            setLoadingId(null);
        }
    };

    // 5. FUNÇÃO DE RECUSA (PUT)
    const confirmarRecusa = async (idProposta) => {
        setModalState({ isOpen: false, locacao: null });
        setLoadingId(idProposta);

        try {
            const response = await fetch(
                `${API_URL}/PropostaLocacao/recusar/${idProposta}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Erro ao recusar.");
            }

            alert("Locação recusada com sucesso e objeto liberado.");

            fetchLocacoesPendentes();
        } catch (error) {
            console.error("Erro na recusa:", error);
            alert(`Erro ao recusar: ${error.message}`);
        } finally {
            setLoadingId(null);
        }
    };

    // 6. FUNÇÃO GERAL PARA O BOTÃO DO MODAL
    const handleConfirm = () => {
        const idProposta = modalState.locacao?.id; 

        if (!idProposta) {
            alert("Erro interno: ID da proposta ausente.");
            setModalState({ isOpen: false, locacao: null });
            return;
        }

        if (modalState.action === 'aprovar') {
            confirmarAprovacao(idProposta);
        } else if (modalState.action === 'recusar') {
            confirmarRecusa(idProposta);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#03033D] text-white items-center">
            
            <AprovacaoModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, locacao: null })}
                onConfirm={handleConfirm} 
                locacao={modalState.locacao}
                action={modalState.action}
            />

            <div className="w-full max-w-4xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <BotaoVoltar />
                    <h1 className="text-2xl font-semibold">Aprovação de Locações</h1>
                    <div className="w-8"></div>
                </div>

                <div className="w-full h-[2px] bg-blue-500 mb-8"></div>

                {/* 7. TRATAMENTO DOS ESTADOS DE CARREGAMENTO/ERRO */}
                {loadingPage ? (
                    <p className="text-center text-blue-300 col-span-2">
                        Carregando solicitações pendentes...
                    </p>
                ) : error ? (
                    <div className="flex items-center justify-center text-red-400 p-4 border border-red-700 rounded-lg col-span-2">
                        <AlertCircle size={20} className="mr-2" /> {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {locacoes.length === 0 ? (
                            <p className="text-center text-gray-400 col-span-2">
                                Nenhuma solicitação pendente.
                            </p>
                        ) : (
                            locacoes.map((locacao) => (
                                <div
                                    key={locacao.id} 
                                    className="bg-primary border border-blue-900 p-5 rounded-xl shadow-lg flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-white">
                                                {/* ✅ CORRIGIDO: Acessa o nome do objeto aninhado 'usuario' */}
                                                {locacao.usuario?.nome || 'Usuário Indisponível'}
                                            </h3>
                                            <span className="bg-yellow-600/30 text-yellow-300 text-xs px-2 py-1 rounded">
                                                Em Análise
                                            </span>
                                        </div>

                                        <div className="space-y-1 text-sm text-gray-300">
                                            <p>
                                                <span className="text-gray-500">Objeto:</span>{" "}
                                                {/* ✅ CORRIGIDO: Acessa o nome do objeto aninhado 'objeto' */}
                                                {locacao.objeto?.nome || 'Objeto Indisponível'}
                                            </p>
                                            <p>
                                                <span className="text-gray-500">Plano:</span>{" "}
                                                {/* ✅ CORRIGIDO: Acessa o nome do objeto aninhado 'planoLocacao' */}
                                                {locacao.planoLocacao?.nome || 'Plano Indisponível'}
                                            </p>
                                            <p>
                                                <span className="text-gray-500">Data:</span>{" "}
                                                {/* ✅ CORRIGIDO: Formata a propriedade 'data' */}
                                                {formatarData(locacao.data)}
                                            </p>
                                            <p className="text-xl font-bold text-white mt-2">
                                                {/* ✅ CORRIGIDO: Usa toFixed(2) e substitui o ponto pela vírgula */}
                                                R$ {(locacao.valor ?? 0).toFixed(2).replace('.', ',')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        {/* Botão APROVAR */}
                                        <button
                                            onClick={() => handleAbrirModal(locacao, 'aprovar')}
                                            disabled={loadingId === locacao.id}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium flex items-center justify-center transition-colors disabled:opacity-50"
                                        >
                                            {loadingId === locacao.id ? (
                                                "Processando..."
                                            ) : (
                                                <>
                                                    <Check size={18} className="mr-2" /> Aprovar
                                                </>
                                            )}
                                        </button>

                                        {/* Botão RECUSAR */}
                                        <button
                                            onClick={() => handleAbrirModal(locacao, 'recusar')}
                                            disabled={loadingId === locacao.id}
                                            className="flex-1 bg-red-600/20 hover:bg-red-600/40 border border-red-600 text-red-500 hover:text-white py-2 rounded-lg font-medium flex items-center justify-center transition-colors"
                                        >
                                            <X size={18} className="mr-2" /> Recusar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
                <MenuGestor />
            </div>
        </div>
    );
}