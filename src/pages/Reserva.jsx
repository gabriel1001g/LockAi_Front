// src/pages/Reserva.jsx

import { Link } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar"; 
import MenuRodape from "../components/MenuRodape"; 
import { useLocacao } from "../contexts/LocacaoContext";

export default function Reserva() {
    const { dadosLocacao } = useLocacao();
    
    // 🚨 CORREÇÃO: Lendo as chaves CORRETAS do contexto
    const armário = dadosLocacao.nomeObjeto || "Armário não selecionado"; 
    const posicaoArmario = dadosLocacao.posicao || "N/A";
    const local = dadosLocacao.localizacao || "N/A";
    const planoSelecionado = dadosLocacao.nomePlano || "Plano não selecionado";
    const valorPlano = dadosLocacao.valor ? `R$ ${dadosLocacao.valor.toFixed(2).replace('.', ',')}` : "R$ 0,00";

    // Criando uma variável para exibir a POSIÇÃO + NOME, como um "Tipo" genérico.
    const tipoArmarioDisplay = `${armário} (${posicaoArmario})`;

    return (
        
        <div className="flex flex-col min-h-screen bg-[#03033D] text-white relative justify-center items-center">
            <div></div>
            <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md mb-2">
                <div className="flex justify-between items-center mb-4">
                    <BotaoVoltar />
                    <h1 className="text-2xl font-semibold text-white">Reserva</h1>
                </div>
        
                <div className="w-70 h-[2px] bg-blue-500 mb-4"></div>

                <div className="flex flex-col items-center">
                    
                    {/* Exemplo: Imagem Dinâmica se quiser */}
                    <img
                        src="/src/assets/img/armario.jpg" 
                        alt="Armário"
                        className="rounded-xl w-full border border-gray-700 shadow-xl mb-8"
                    />

                    <div className="w-full px-2 space-y-4 text-sm font-light">
                        
                        {/* Linha: Tipo */}
                        <div className="flex justify-between items-center text-md font-normal mb-2">
                            <span>Armário Selecionado</span>
                            {/* 🚨 USANDO VARIÁVEL CORRIGIDA */}
                            <strong className="text-white">{tipoArmarioDisplay}</strong> 
                        </div>

                        {/* Linha: Plano e Preço */}
                        <div className="flex justify-between items-center text-lg font-normal mb-6">
                            {/* 🚨 USANDO VARIÁVEL CORRIGIDA */}
                            <span>{planoSelecionado}</span>
                            {/* 🚨 USANDO VARIÁVEL CORRIGIDA */}
                            <strong className="text-xl font-semibold">{valorPlano}</strong> 
                        </div>
                        
                        {/* Linha: Posição */}
                        <div className="flex justify-between">
                            <span className="font-normal">Posição</span>
                            {/* 🚨 USANDO VARIÁVEL CORRIGIDA */}
                            <span className="font-semibold">{posicaoArmario}</span> 
                        </div>
                        
                        {/* Linha: Localização */}
                        <div className="flex justify-between">
                            <span className="font-normal">Localização (Nº)</span>
                            {/* 🚨 USANDO VARIÁVEL CORRIGIDA */}
                            <span className="font-semibold">{local}</span> 
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-between w-full mt-10 space-x-4">
                        <Link to="/locacao" className="w-1/2">
                            <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold transition-colors">
                                Voltar
                            </button>
                        </Link>
                        
                        <Link to="/pagamento" className="w-1/2">
                            <button className="w-full py-3 rounded-xl bg-white text-blue-600 hover:bg-gray-200 font-bold transition-colors">
                                Avançar
                            </button>
                        </Link>
                    </div>
                </div>
                <MenuRodape /> 
            </div>
        </div>
    );
}