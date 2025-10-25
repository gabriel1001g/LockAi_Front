import { Link } from "react-router-dom";
import MenuRodape from "../components/MenuRodape";
import BotaoVoltar from "../components/BotaoVoltar";

export default function Planos() {
  return (
    <div className="flex flex-col min-h-screen bg-[#03033D] text-white relative justify-center items-center">
      <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
          <BotaoVoltar />
          <h1 className="text-2xl font-semibold text-white">Planos</h1>
        </div>

        <div className="w-70 h-[2px] bg-blue-500 mb-4"></div>
        
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Planos</h2>
          
          {/* Plano Semestral */}
          
          <Link to="/Locacao" className="block mb-5">
           <img
              src="/src/assets/img/armario2.jpg"
              alt="Armário"
              className="w-full rounded-t-lg"
            />
            <div className="bg-gray-900 rounded-b-lg p-3">
              <div className="flex justify-between">
                <span className="text-white">Plano Semestral</span>
                <strong className="text-white">R$ 60,00</strong>
              </div>
            </div>
            
          </Link>
          

          {/* Plano Anual */}
          <Link to="/Locacao" className="block">
            <img
              src="/src/assets/img/armario2.jpg"
              alt="Armário"
              className="w-full rounded-t-lg"
            />
            <div className="bg-gray-900 rounded-b-lg p-3">
              <div className="flex justify-between">
                <span className="text-white">Plano Anual</span>
                <strong className="text-white">R$ 120,00</strong>
              </div>
            </div>
          </Link>

          <MenuRodape />
        </div>
      </div>
    </div>
  );
}