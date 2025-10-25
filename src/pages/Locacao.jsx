import { useState } from "react";
import { Link } from "react-router-dom";
import MenuRodape from "../components/MenuRodape";
import BotaoVoltar from "../components/BotaoVoltar";

export default function Locacao() {
  const [posicaoSelecionada, setPosicaoSelecionada] = useState(null);
  // Estado para armazenar a localização selecionada, se necessário para estilizar
  const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState(null);

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

        {/* Localização - AGORA É EXIBIDA SEMPRE (Removido o condicional 'posicaoSelecionada &&') */}
        <h4 className="text-lg font-bold mb-3">Localização</h4>
        <div>
          {["Nº 001", "Nº 002", "Nº 003"].map((loc) => (
            // O redirecionamento só deve ocorrer se uma Posição estiver selecionada
            // Se for permitido reservar sem posição, remova o condicional 'posicaoSelecionada'
            posicaoSelecionada ? (
              <Link
                key={loc}
                to={`/reserva?posicao=${posicaoSelecionada}&local=${loc}`}
                onClick={() => setLocalizacaoSelecionada(loc)}
                className={`block p-3 mb-3 rounded-lg cursor-pointer transition-colors ${
                  localizacaoSelecionada === loc && posicaoSelecionada
                    ? "bg-blue-600"
                    : "bg-gray-800 hover:bg-gray-700"
                } ${!posicaoSelecionada ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loc}
              </Link>
            ) : (
              // Se nenhuma posição for selecionada, desabilita visualmente o item
              <div
                key={loc}
                className="p-3 mb-3 rounded-lg bg-gray-900 opacity-50 cursor-not-allowed"
              >
                {loc} (Selecione uma Posição)
              </div>
            )
          ))}
        </div>
        <MenuRodape />
        
      </div>

      
    </div>
  );
}