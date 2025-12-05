import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuRodape from "../../components/MenuRodape";
import persona from "../../assets/img/persona.jpg";
import { useAuth } from "../../contexts/AuthContext";

export default function Conta() {
  const [abrirPopupSair, setAbrirPopupSair] = useState(false);
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  return (
    // 1. CONTAINER CENTRALIZADOR
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
            onClick={() => setAbrirPopupSair(true)}
            className="w-full max-w-xs bg-red-600 p-4 rounded-xl"
          >
            Sair da conta
          </button>
          
        </div>

        {/* 4. MENU DE RODAPÉ: (Fixo na parte de baixo) */}
        <MenuRodape /> 

        {/* POPUP FIXO (Modal) */}
        {abrirPopupSair && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
            <div className="bg-white text-black w-80 p-6 rounded-2xl text-center">
              <h2 className="text-xl font-semibold mb-4">
                Tem certeza que deseja sair?
              </h2>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setAbrirPopupSair(false)}
                  className="flex-1 bg-red-500 p-3 text-white rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  // 🚨 CHAMANDO LOGOUT E NAVEGANDO
                  onClick={() => {
                      logout(); 
                      navigate("/login");
                  }}
                  className="flex-1 bg-green-600 p-3 text-white rounded-lg"
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