// src/pages/Locacao.jsx

import { useNavigate } from "react-router-dom";
import MenuRodape from "../components/MenuRodape";
import BotaoVoltar from "../components/BotaoVoltar";
import { useLocacao } from "../contexts/LocacaoContext";
import { useState } from "react"; // Removed useEffect

// 🚨 MAPEAMENTO ESTÁTICO DE OBJETOS
// Este mapeamento é usado para simular o banco de dados e obter o ID do Objeto
const mapeamentoObjetos = {
    "Alto_Nº 001": { id: 1, nome: "Armário A1", posicao: "Alto", localizacao: "Nº 001" },
    "Alto_Nº 002": { id: 2, nome: "Armário A2", posicao: "Alto", localizacao: "Nº 002" },
    "Alto_Nº 003": { id: 3, nome: "Armário A3", posicao: "Alto", localizacao: "Nº 003" },
    "Médio_Nº 001": { id: 4, nome: "Armário M1", posicao: "Médio", localizacao: "Nº 001" },
    "Médio_Nº 002": { id: 5, nome: "Armário M2", posicao: "Médio", localizacao: "Nº 002" },
    "Médio_Nº 003": { id: 6, nome: "Armário M3", posicao: "Médio", localizacao: "Nº 003" },
    "Baixo_Nº 001": { id: 7, nome: "Armário B1", posicao: "Baixo", localizacao: "Nº 001" },
    "Baixo_Nº 002": { id: 8, nome: "Armário B2", posicao: "Baixo", localizacao: "Nº 002" },
    "Baixo_Nº 003": { id: 9, nome: "Armário B3", posicao: "Baixo", localizacao: "Nº 003" },
};

export default function Locacao() {
    // 🚨 REMOVIDOS estados de API: objetosDisponiveis, isLoading, error
    const [posicaoSelecionada, setPosicaoSelecionada] = useState(null);
    const { atualizarLocacao } = useLocacao();
    const navigate = useNavigate();
    // 🚨 REMOVIDO useAuth (token não é mais necessário aqui)

    // 🚨 REMOVIDO useEffect de fetchObjetos

    const selecionarLocal = (local) => {
        if (!posicaoSelecionada) return;

        const chave = `${posicaoSelecionada}_${local}`;
        const objetoSelecionado = mapeamentoObjetos[chave];

        if (!objetoSelecionado) {
            alert(`Erro: Armário na posição ${chave} não mapeado.`);
            return;
        }

        // Usa os dados do mapeamento estático
        atualizarLocacao({
        idObjeto: objetoSelecionado.id, 
        
        // As chaves devem corresponder ao LocacaoContext:
        nomeObjeto: objetoSelecionado.nome,    // Ex: "Armário A1"
        posicao: objetoSelecionado.posicao,    // Ex: "Alto"
        localizacao: local,                    // Ex: "Nº 001"
    });

        navigate("/reserva");
    };

    // 🚨 GERANDO AS LOCALIZAÇÕES (Nº 001, Nº 002, etc.) DE FORMA ESTÁTICA
    // Isso simula os locais disponíveis para a Posição selecionada
    const locaisDisponiveis = [
        "Nº 001",
        "Nº 002",
        "Nº 003",
        // Adicione mais se necessário
    ];

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
                    {locaisDisponiveis.map((loc) => (
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

                <MenuRodape />

            </div>
        </div>
    );
}