import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import MenuRodape from "../components/MenuRodape";

// URL DA API
const API_URL =
  "https://lockaiapii-g7egamgghuhrhrej.brazilsouth-01.azurewebsites.net";

export default function UsuarioLocacao() {
  const { username, token } = useAuth();

  const [locacaoAtiva, setLocacaoAtiva] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função auxiliar para formatar data
  const formatarData = (dataString) => {
    if (!dataString) return "--";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    async function fetchLocacaoAtiva() {
      if (!token) {
        setError("Token de autenticação ausente.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setLocacaoAtiva(null);

      try {
        const response = await fetch(
          `${API_URL}/Locacao/GetLocacaoAtivaPorUsuario`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404 || response.status === 204) {
            setLocacaoAtiva(null);
            return;
          }
          throw new Error("Erro ao buscar locação: " + response.statusText);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();

          if (data && data.id) {
            setLocacaoAtiva(data);
          } else {
            setLocacaoAtiva(null);
          }
        } else {
          setLocacaoAtiva(null);
        }
      } catch (err) {
        console.error("Erro ao buscar locação:", err);
        setError("Não foi possível conectar-se ao servidor ou erro de dados.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocacaoAtiva();
  }, [token]);

  return (
    // 1. CONTAINER CENTRALIZADOR (Toda a tela). Use uma cor de fundo que você definiu para o body (ou mantenha o default)
    <div className="flex justify-center items-stretch min-h-screen w-screen bg-[#03033D]">
      
      {/* 2. CONTAINER SIMULANDO O CELULAR (Borda e Fundo). Tem altura fixa (h-screen) e é flex-col para organizar conteúdo (flex-1) e rodapé. */}
      <div className="flex flex-col h-screen w-full max-w-sm  bg-primary text-white relative">
        
        {/* 3. CONTEÚDO ROLÁVEL (Área principal). Ocupa o espaço restante (flex-1) e permite rolagem. */}
        <div className="flex-1 overflow-y-auto no-scrollbar pt-6 pb-20 px-4"> 

            {/* Cabeçalho */}
            <div className="w-full mb-6 text-left">
              <h1 className="text-2xl font-bold">Sua Locação</h1>
              <p className="text-lg opacity-80">Olá, {username}</p>
            </div>

            {/* Linha Divisória */}
            <div className="w-full h-[2px] bg-blue-500 mb-8"></div>

            {/* Área de Exibição */}
            <div className="w-full">
              
              {isLoading && (
                <div className="text-center mt-12">
                  <p className="text-blue-400">Buscando sua locação ativa...</p>
                </div>
              )}

              {error && !isLoading && (
                <div className="text-center mt-12 p-4 bg-red-800/30 rounded-lg">
                  <p className="text-red-400 font-semibold">Erro na Conexão</p>
                  <p className="text-sm opacity-80">{error}</p>
                </div>
              )}

              {!isLoading && !error && !locacaoAtiva && (
                <div className="text-center mt-12">
                  <p className="text-3xl mb-4">🏠</p>
                  <h2 className="text-xl font-semibold mb-2">Sem Locação Ativa</h2>
                  <p className="opacity-70">
                    Você não possui nenhuma locação em andamento no momento.
                  </p>
                </div>
              )}

              {locacaoAtiva && (
                <div className="bg-[#0066FF] text-white rounded-3xl p-6 shadow-xl space-y-4">
                  <h2 className="text-2xl font-bold border-b border-white/50 pb-2 mb-4">
                    Locação Atual
                  </h2>

                  {/* Detalhes do Plano */}
                  <div>
                    <p className="text-sm opacity-80">Plano Contratado</p>
                    <p className="text-xl font-semibold">
                      {locacaoAtiva.propostaLocacao?.planoLocacao?.nome ||
                        "Nome do Plano"}
                    </p>
                  </div>

                  {/* Datas */}
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-xs opacity-70">Data Início</p>
                      <p className="font-medium">
                        {formatarData(locacaoAtiva.dataInicio)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs opacity-70">
                        Data Prevista de Fim
                      </p>
                      <p className="font-medium">
                        {formatarData(locacaoAtiva.dataFim)}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="pt-2">
                    <p className="text-sm opacity-80">Status Atual</p>
                    <p
                      className={`text-xl font-bold ${
                        // Define a cor baseada no status
                        locacaoAtiva.situacao === "Ativa"
                          ? "text-yellow-300"
                          : locacaoAtiva.situacao === "Cancelada"
                          ? "text-red-400"
                          : "text-gray-300"
                      }`}
                    >
                      {locacaoAtiva.situacao?.toUpperCase() ||
                        "Status Indefinido"}
                    </p>
                  </div>

                  {/* Objeto */}
                  <div className="pt-4">
                    <p className="text-sm opacity-80">Objeto Locado</p>
                    <div className="bg-white/10 p-3 rounded-lg flex justify-center items-center mt-1">
                      <span className="text-xl font-bold tracking-wide">
                        {locacaoAtiva.propostaLocacao?.objeto?.nome ||
                          "Objeto não identificado"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
        </div>

        {/* 4. MENU DE RODAPÉ: Deve ficar fora da área de scroll */}
        <MenuRodape /> 

      </div> 
      
    </div>
  );
}