// src/components/AprovacaoModal.jsx

import React from 'react';

export default function AprovacaoModal({ isOpen, onClose, onConfirm, locacao }) {
    if (!isOpen) return null;

    // Garante que temos um objeto de locação para exibir detalhes
    if (!locacao) {
        onClose(); // Fecha se o objeto for nulo
        return null;
    }

    const { id, nomeUsuario, nomeObjeto, valor } = locacao;

    return (
        // Overlay escuro
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
            {/* O Modal em si */}
            <div className="bg-primary p-6 rounded-xl shadow-2xl w-full max-w-sm border border-blue-700/50">
                <h3 className="text-xl font-bold mb-4 text-white">Confirmar Aprovação</h3>
                <div className="w-full h-[1px] bg-blue-500 mb-4"></div>

                <p className="text-gray-300 mb-4">Você está prestes a aprovar a seguinte locação:</p>
                
                <div className="bg-blue-600/30 p-3 rounded-lg mb-6 text-sm">
                    <p className="font-semibold text-white">{nomeUsuario}</p>
                    <p className="text-gray-400">Armário: {nomeObjeto}</p>
                    <p className="text-xl font-bold text-green-400 mt-1">R$ {valor ? valor.toFixed(2) : '0.00'}</p>
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
                        onClick={() => onConfirm(id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
                    >
                        Sim, Aprovar
                    </button>
                </div>
            </div>
        </div>
    );
}