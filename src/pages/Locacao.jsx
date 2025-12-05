import { useNavigate } from "react-router-dom";
import MenuRodape from "../components/MenuRodape";
import BotaoVoltar from "../components/BotaoVoltar";
import { useLocacao } from "../contexts/LocacaoContext";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Loader2, AlertTriangle } from 'lucide-react';

const API_URL = "https://lockaiapii-g7egamgghuhrhrej.brazilsouth-01.azurewebsites.net";

// 🚨 STATUS DO OBJETO: Assumindo que 0 (zero) corresponde a "Ativo" / "Disponível"
const STATUS_ATIVO = 0; 

export default function Locacao() {
    const { token } = useAuth();
    const { atualizarLocacao } = useLocacao();
    const navigate = useNavigate();

    // ESTADOS PARA OS DADOS REAIS DA API
    const [objetosDisponiveis, setObjetosDisponiveis] = useState({}); // Objetos agrupados por Localidade Secundária
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ESTADOS DE SELEÇÃO
    const [localidadeSecundariaSelecionada, setLocalidadeSecundariaSelecionada] = useState(null);
    const [locaisDisponiveis, setLocaisDisponiveis] = useState([]); // Objetos que pertencem à Localidade Secundária selecionada

    // 1. FUNÇÃO PARA BUSCAR TODOS OS OBJETOS E FILTRAR NO FRONT-END
    const fetchObjetos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 🚨 CHAMA O ENDPOINT GERAL /Objeto (que retorna TUDO)
            const response = await fetch(`${API_URL}/Objeto`, { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Erro ao buscar objetos.");
            }

            const data = await response.json();
            
            // Pega a lista real de objetos, tratando o formato do Json.NET
            const objetosReais = data.$values || data; 

            // 🚨 FILTRAGEM NO FRONT-END: Filtra apenas objetos com situacao = 0 (Ativo)
            const OBJETOS_ATIVOS = objetosReais.filter(obj => 
                obj.situacao === STATUS_ATIVO
            );

            // AGRUPA OBJETOS PELA LOCALIDADE SECUNDÁRIA (SUA NOVA "POSIÇÃO")
            const objetosAgrupados = OBJETOS_ATIVOS.reduce((acc, obj) => {
                const key = obj.localidadeSecundaria;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {});

            setObjetosDisponiveis(objetosAgrupados);

        } catch (err) {
            console.error("Erro ao carregar e filtrar objetos:", err);
            setError("Não foi possível carregar os objetos. Verifique a conexão com a API.");
        } finally {
            setIsLoading(false);
        }
    }, [token]);
    
    useEffect(() => {
        fetchObjetos();
    }, [fetchObjetos]);

    // 2. HANDLER DE SELEÇÃO DE POSIÇÃO/LOCALIDADE SECUNDÁRIA
    const handleSelecionarLocalidadeSecundaria = (localidadeSecundaria) => {
        setLocalidadeSecundariaSelecionada(localidadeSecundaria);
        // Define os objetos disponíveis para esta Localidade Secundária
        setLocaisDisponiveis(objetosDisponiveis[localidadeSecundaria] || []);
    };
    
    // 3. HANDLER DE SELEÇÃO DO OBJETO FINAL (LEVA PARA RESERVA)
    const selecionarObjeto = (objeto) => {
        // Objeto selecionado é um item completo do JSON da API
        atualizarLocacao({
            idObjeto: objeto.id, 
            nomeObjeto: objeto.nome, 
            posicao: objeto.localidadeSecundaria, // Localidade Secundária como Posição
            localizacao: objeto.localidadeTercearia, // Localidade Terciária como Localização
            localidadePrimaria: objeto.localidadePrimaria
        });

        navigate("/reserva");
    };

    const listaLocalidadesSecundarias = Object.keys(objetosDisponiveis);

    // 4. ESTRUTURA VISUAL DO COMPONENTE
    return (
        <div className="flex justify-center items-stretch min-h-screen w-screen bg-[#03033D]">
      
      {/* 2. CONTAINER SIMULANDO O CELULAR (Borda e Fundo). Tem altura fixa (h-screen) e é flex-col para organizar conteúdo (flex-1) e rodapé. */}
      <div className="flex flex-col h-screen w-full max-w-sm  bg-primary text-white relative">
        
        {/* 3. CONTEÚDO ROLÁVEL (Área principal). Ocupa o espaço restante (flex-1) e permite rolagem. */}
        <div className="flex-1 overflow-y-auto no-scrollbar pt-6 pb-20 px-4"> 
                
                {/* Cabeçalho */}
                <div className="flex justify-between items-center mb-4">
                    <BotaoVoltar />
                    <h1 className="text-2xl font-semibold text-white">Locação de Objetos</h1>
                </div>

                {/* Linha divisória */}
                <div className="w-full h-px bg-blue-500 mb-6"></div>

                {/* Loading e Erro */}
                {isLoading && (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-blue-500 mr-2" /> Carregando e filtrando objetos...
                    </div>
                )}
                {error && (
                    <div className="flex items-center text-red-400 p-3 bg-red-900/30 rounded-lg">
                        <AlertTriangle size={20} className="mr-2" /> {error}
                    </div>
                )}

                {/* Posições / Localidades Secundárias */}
                {!isLoading && !error && (
                    <>
                        <h4 className="text-lg font-bold mb-3">Selecione a Localidade (Ex: Térreo, Zona Sul)</h4>
                        <div className="mb-5 max-h-40 overflow-y-auto">
                            {listaLocalidadesSecundarias.length === 0 ? (
                                <p className="text-gray-400">Nenhum objeto ativo disponível para locação.</p>
                            ) : (
                                listaLocalidadesSecundarias.map((localidade) => (
                                    <div
                                        key={localidade}
                                        onClick={() => handleSelecionarLocalidadeSecundaria(localidade)}
                                        className={`p-3 mb-3 rounded-lg cursor-pointer transition-colors ${
                                            localidadeSecundariaSelecionada === localidade
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-gray-800 hover:bg-gray-700"
                                        }`}
                                    >
                                        {localidade} ({objetosDisponiveis[localidade].length} disponíveis)
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Localização / Objetos */}
                        <h4 className="text-lg font-bold mb-3">Selecione o Objeto/Local Específico</h4>
                        <div className="max-h-60 overflow-y-auto">
                            {localidadeSecundariaSelecionada ? (
                                locaisDisponiveis.map((objeto) => (
                                    <div
                                        key={objeto.id}
                                        onClick={() => selecionarObjeto(objeto)}
                                        className="block p-3 mb-3 rounded-lg cursor-pointer transition-colors bg-gray-800 hover:bg-green-600"
                                    >
                                        <p className="font-semibold text-white">{objeto.nome}</p>
                                        <p className="text-xs text-gray-400">
                                            {objeto.localidadeTercearia} | {objeto.localidadePrimaria}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">Selecione uma Localidade acima para ver os objetos.</p>
                            )}
                        </div>
                    </>
                )}
                <MenuRodape />
            </div>
            </div>
        </div>
    );
}