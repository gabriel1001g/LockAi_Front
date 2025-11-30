
import { useNavigate } from "react-router-dom";
import MenuRodape from "../components/MenuRodape";
import BotaoVoltar from "../components/BotaoVoltar";
import { useLocacao } from "../contexts/LocacaoContext";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const API_URL = "https://lockai.azurewebsites.net";

/*const mapeamentoObjetos = {
  "Alto_Nº 001": 1, 
  "Alto_Nº 002": 2,
  "Alto_Nº 003": 3,
  "Médio_Nº 001": 1, 
  "Médio_Nº 002": 2,
  "Médio_Nº 003": 3,
  "Baixo_Nº 001": 1,
  "Baixo_Nº 002": 2,
  "Baixo_Nº 003": 3,
};*/

export default function Locacao() {
  const [objetosDisponiveis, setObjetosDisponiveis] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
  const [posicaoSelecionada, setPosicaoSelecionada] = useState(null);
  const { atualizarLocacao } = useLocacao();
  const navigate = useNavigate();
  const { token } = useAuth();


  useEffect(() => {
        async function fetchObjetos() {
            try {
                // Você pode precisar de autorização aqui se o endpoint exigir
                // Se for um endpoint público, remova o cabeçalho 'Authorization'
                const response = await fetch(`${API_URL}/PropostaLocacao`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Se o endpoint precisar de token (ex: [Authorize]), adicione aqui:
                        'Authorization': `Bearer ${token}` 
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: Falha ao carregar objetos.`);
                }

                const data = await response.json();
                setObjetosDisponiveis(data); // Assume que 'data' é um array de objetos
            } catch (err) {
                setError(err.message);
                console.error("Erro ao buscar objetos:", err);
            } finally {
                setIsLoading(false);
            }
        }

        if (token) {
            fetchObjetos();
        }
        // 🚨 CORRIGIDO: Adiciona 'token' ao array de dependências
    }, [token]); // <- Aqui!

const selecionarLocal = (local) => {
    if (!posicaoSelecionada) return;

    const objetoReal = objetosDisponiveis.find(obj => 
        obj.Posicao === posicaoSelecionada && obj.Localizacao === local
    );

    if (!objetoReal) {
        // Isso garante que o usuário só pode selecionar armários que existem
        alert("Erro: Armário não disponível ou não encontrado no banco de dados.");
        return;
    }

    // O payload usa o ID real do banco de dados!
    atualizarLocacao({
        idObjeto: objetoReal.Id, // 🚨 ESSENCIAL: ID REAL DO BANCO
        posicao: posicaoSelecionada,
        localizacao: local,
        // Você pode querer salvar outros campos aqui:
        objeto: objetoReal.Nome 
    });
    
    navigate("/reserva"); 
  };
  const locaisDisponiveis = objetosDisponiveis
    .filter(obj => obj.Posicao === posicaoSelecionada)
    .map(obj => obj.Localizacao);

// Garante que só mostra locais únicos
const locaisUnicos = [...new Set(locaisDisponiveis)];

  return (
    
    <div className="flex flex-col min-h-screen bg-[#03033D] text-white relative justify-center items-center">
          <div></div>
          <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md mb-2">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-4">
          <BotaoVoltar />
          <h1 className="text-2xl font-semibold text-white">Locação</h1>
        </div>

        {/* Linha divisória */}
        <div className="w-full h-px bg-blue-500 mb-6"></div>

        {/* 🚨 RENDERIZAÇÃO CONDICIONAL DO ESTADO DE CARREGAMENTO/ERRO */}
        {isLoading && <p className="text-center text-blue-400">Carregando armários...</p>}
        {error && <p className="text-center text-red-500">Erro: {error}. Tente fazer login novamente.</p>}
        {!token && !isLoading && <p className="text-center text-yellow-500">Faça login para ver as opções de locação.</p>}

        {/* O conteúdo real (Posições e Localização) só deve ser renderizado aqui: */}
        {!isLoading && !error && (
            <>
                {/* Posições */}
                <h4 className="text-lg font-bold mb-3">Posições</h4>
                <div className="mb-5">
                    {["Alto", "Médio", "Baixo"].map((pos) => (
                        <div
                            key={pos}
                            onClick={() => setPosicaoSelecionada(pos)}
                            className={`p-3 mb-3 rounded-lg cursor-pointer transition-colors ${
                                posicaoSelecionada === pos
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-800 hover:bg-gray-700"
                            }`}
                        >
                            {pos}
                        </div>
                    ))}
                </div>

                {/* Localização */}
                <h4 className="text-lg font-bold mb-3">Localização</h4>
                <div>
                    {locaisUnicos.map((loc) => ( 
                        <div
                            key={loc}
                            onClick={() => selecionarLocal(loc)}
                            className={`block p-3 mb-3 rounded-lg cursor-pointer transition-colors ${
                                posicaoSelecionada
                                    ? "bg-gray-800 hover:bg-blue-600"
                                    : "bg-gray-900 opacity-50 cursor-not-allowed"
                            }`}
                        >
                            {loc}
                        </div>
                    ))}
                </div>
            </>
        )}
        
        <MenuRodape />
        
      </div>

      
    </div>
  );
}