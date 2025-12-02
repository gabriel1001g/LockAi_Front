import { useState } from "react";
import { Check, X, AlertCircle } from "lucide-react";
import BotaoVoltar from "../../components/BotaoVoltar";
import AprovacaoModal from "../../components/AprovacaoModal";

import { useAuth } from "../../contexts/AuthContext";
import MenuGestor from "../../components/menuGestor";

const API_URL = "https://lockaiapii-g7egamgghuhrhrej.brazilsouth-01.azurewebsites.net";

export default function AprovacaoLocacoes() {
  const { token } = useAuth();
  const [loadingId, setLoadingId] = useState(null); // Para saber qual item está carregando
  const [modalState, setModalState] = useState({ 
    isOpen: false, 
    locacao: null,
    action: '' 
  });

  // 1. 🚨 DADOS MOCKADOS (SIMULAÇÃO DO BANCO DE DADOS)
  // Use isso para desenhar a tela sem precisar do GET da API.
  // Certifique-se de que os IDs (1, 2, 3) existem no seu banco para o teste do PUT funcionar!
  const [locacoes, setLocacoes] = useState([
    {
      id: 1, // <--- Este ID precisa existir no banco como "EmAnalise"
      nomeUsuario: "João Silva",
      nomeObjeto: "Armário A1",
      plano: "Mensal",
      valor: 60.0,
      dataSolicitacao: "30/11/2025",
    },
    {
      id: 2, // <--- ID fictício para teste visual
      nomeUsuario: "Maria Oliveira",
      nomeObjeto: "Armário B2",
      plano: "Semestral",
      valor: 150.0,
      dataSolicitacao: "01/12/2025",
    },
    {
      id: 3, // <--- Este ID precisa existir no banco como "EmAnalise"
      nomeUsuario: "João Silva",
      nomeObjeto: "Armário A1",
      plano: "Mensal",
      valor: 60.0,
      dataSolicitacao: "30/11/2025",
    },
    {
      id: 4, // <--- ID fictício para teste visual
      nomeUsuario: "Maria Oliveira",
      nomeObjeto: "Armário B2",
      plano: "Semestral",
      valor: 150.0,
      dataSolicitacao: "01/12/2025",
    },
    {
      id: 5, // <--- Este ID precisa existir no banco como "EmAnalise"
      nomeUsuario: "João Silva",
      nomeObjeto: "Armário A1",
      plano: "Mensal",
      valor: 60.0,
      dataSolicitacao: "30/11/2025",
    },
    {
      id: 6, // <--- ID fictício para teste visual
      nomeUsuario: "Maria Oliveira",
      nomeObjeto: "Armário B2",
      plano: "Semestral",
      valor: 150.0,
      dataSolicitacao: "01/12/2025",
    },

    // Adicione mais itens se quiser testar o layout
  ]);

  // 2. 🚨 FUNÇÃO QUE CHAMA A API REAL
  const handleAbrirModal = (locacao) => {
    setModalState({
      isOpen: true,
      locacao: locacao,
    });
  };
  const confirmarAprovacao = async (idProposta) => {
    setModalState({ isOpen: false, locacao: null }); // Fechar Modal imediatamente
    setLoadingId(idProposta); // Inicia o loading no card

    try {
      const response = await fetch(
        `${API_URL}/api/PropostaLocacao/aprovar/${idProposta}`,
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

      // ATUALIZAÇÃO VISUAL: Remove o item da lista
      setLocacoes((prev) => prev.filter((item) => item.id !== idProposta));
    } catch (error) {
      console.error("Erro:", error);
      alert(`Erro ao aprovar: ${error.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#03033D] text-white items-center">
      {/* 🚨 COMPONENTE MODAL */}
      <AprovacaoModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, locacao: null })}
        onConfirm={confirmarAprovacao} // Chama a função que faz o PUT
        locacao={modalState.locacao}
      />
      {/* FIM MODAL */}

      <div className="w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <BotaoVoltar />
          <h1 className="text-2xl font-semibold">Aprovação de Locações</h1>
          <div className="w-8"></div>
        </div>

        <div className="w-full h-[2px] bg-blue-500 mb-8"></div>

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
                      {locacao.nomeUsuario}
                    </h3>
                    <span className="bg-yellow-600/30 text-yellow-300 text-xs px-2 py-1 rounded">
                      Em Análise
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-300">
                    <p>
                      <span className="text-gray-500">Objeto:</span>{" "}
                      {locacao.nomeObjeto}
                    </p>
                    <p>
                      <span className="text-gray-500">Plano:</span>{" "}
                      {locacao.plano}
                    </p>
                    <p>
                      <span className="text-gray-500">Data:</span>{" "}
                      {locacao.dataSolicitacao}
                    </p>
                    <p className="text-xl font-bold text-white mt-2">
                      R$ {locacao.valor.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  {/* 🚨 MUDANÇA AQUI: CHAMA handleAbrirModal */}
                  <button
                    onClick={() => handleAbrirModal(locacao)}
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
        <MenuGestor></MenuGestor>
      </div>
    </div>
  );
}
