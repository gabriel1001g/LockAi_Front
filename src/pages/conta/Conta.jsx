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
    <div className="flex flex-col min-h-screen bg-[#03033D] text-white relative justify-center items-center">
      <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md mb-2">
      <div className="flex flex-col items-center p-6 pt-10">
        
        <img
          src={persona}
          alt="foto"
          className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
        />

        <h2 className="text-lg font-semibold mb-6">{username}</h2>

        <button
          onClick={() => navigate("/conta/perfil")}
          className="w-full max-w-xs bg-white text-black p-4 rounded-xl mb-4"
        >
          Meu perfil
        </button>

       

        <button
          onClick={() => setAbrirPopupSair(true)}
          className="w-full max-w-xs bg-red-600 p-4 rounded-xl"
        >
          Sair da conta
        </button>
        <MenuRodape></MenuRodape>
      </div>

      

      {abrirPopupSair && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white text-black w-80 p-6 rounded-2xl text-center">
            <h2 className="text-xl font-semibold mb-4">Tem certeza que deseja sair?</h2>

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
