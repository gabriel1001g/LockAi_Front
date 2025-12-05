import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import MenuGestor from "../../components/menuGestor";
import persona from "../../assets/img/persona.jpg";

export default function ContaGestor() {
  const [abrirPopupSair, setAbrirPopupSair] = useState(false);
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  return (
    // 1. CONTAINER GERAL (Fundo da tela desktop)
    <div className="flex justify-center items-stretch min-h-screen w-screen bg-[#03033D]">
      
      {/* 2. CONTAINER MOBILE (Simulação da tela do celular) */}
      <div className="flex flex-col h-screen w-full max-w-sm bg-primary text-white relative">
        
        
        <div className="flex-1 overflow-y-auto no-scrollbar pt-6 pb-20 px-4 flex flex-col items-center justify-center text-center"> 
          
          <img
            src={persona}
            alt="foto"
            className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
          />

          <h2 className="text-lg font-semibold mb-6">{username}</h2>

          <button
            onClick={() => navigate("/gestor/cadastrogestor")}
            className="w-full max-w-xs bg-white text-black p-4 rounded-xl mb-4 font-semibold hover:bg-gray-200 transition"
          >
            Cadastro Gestor
          </button>

          <button
            onClick={() => setAbrirPopupSair(true)}
            className="w-full max-w-xs bg-red-600 p-4 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Sair da conta
          </button>

        </div>

        {/* 4. MENU GESTOR (Fixo na parte inferior, fora da área de scroll) */}
        <MenuGestor />

        {/* POPUP DE CONFIRMAÇÃO */}
        {abrirPopupSair && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white text-black w-80 p-6 rounded-2xl text-center shadow-2xl">
              <h2 className="text-xl font-semibold mb-4">
                Tem certeza que deseja sair?
              </h2>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setAbrirPopupSair(false)}
                  className="flex-1 bg-gray-400 p-3 text-white rounded-lg font-bold hover:bg-gray-500 transition"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="flex-1 bg-red-600 p-3 text-white rounded-lg font-bold hover:bg-red-700 transition"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}