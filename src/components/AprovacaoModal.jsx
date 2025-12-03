import React from 'react';

// Recebe a prop 'action' ('aprovar' ou 'recusar')
export default function AprovacaoModal({ isOpen, onClose, onConfirm, locacao, action }) { 
    if (!isOpen) return null;

    // Garante que temos um objeto de locação para exibir detalhes
    if (!locacao) {
        onClose(); // Fecha se o objeto for nulo
        return null;
    }

    // --- Lógica de Customização ---
    const isAprovar = action === 'aprovar';

    const titulo = isAprovar ? "Confirmar Aprovação" : "Confirmar Recusa";
    const mensagem = isAprovar 
        ? "Você está prestes a aprovar a seguinte locação:" 
        : "Você está prestes a **recusar** a seguinte locação. Esta ação irá liberar o armário para outros usuários.";
    const textoBotao = isAprovar ? "Sim, Aprovar" : "Sim, Recusar";
    const corBotao = isAprovar ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700";
    const corTextoValor = isAprovar ? "text-green-400" : "text-gray-400";
    // --- Fim Lógica de Customização ---

    const { id, nomeUsuario, nomeObjeto, valor } = locacao;

    return (
        // Overlay escuro
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
            {/* O Modal em si */}
            <div className="bg-[#03033D] p-6 rounded-xl shadow-2xl w-full max-w-sm border border-blue-700/50">
                <h3 className="text-xl font-bold mb-4 text-white">{titulo}</h3>
                <div className="w-full h-[1px] bg-blue-500 mb-4"></div>

                {/* Usa perigosamente 'dangerouslySetInnerHTML' para formatar a mensagem */}
                <p className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: mensagem }}></p>
                
                <div className={`bg-blue-600/30 p-3 rounded-lg mb-6 text-sm ${!isAprovar ? 'border border-red-500/50' : ''}`}>
                    <p className="font-semibold text-white">{nomeUsuario}</p>
                    <p className="text-gray-400">Armário: {nomeObjeto}</p>
                    {/* ✅ CORREÇÃO: Uso seguro do toFixed */}
                    <p className={`text-xl font-bold mt-1 ${corTextoValor}`}>
                        R$ {(valor ?? 0).toFixed(2)} 
                    </p>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        // ✅ CORREÇÃO: Não passe o ID aqui. O ID deve ser tratado no handleConfirm, 
                        // que já pega o ID do modalState para evitar o erro 'undefined' que você tinha.
                        // O onConfirm já foi ajustado no componente pai (AprovacaoLocacoes.jsx) para buscar o ID.
                        onClick={onConfirm} 
                        className={`px-4 py-2 ${corBotao} rounded-lg text-white font-medium transition-colors`}
                    >
                        {textoBotao}
                    </button>
                </div>
            </div>
        </div>
    );
}