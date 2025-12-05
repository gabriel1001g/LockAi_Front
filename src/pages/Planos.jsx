import { useNavigate } from "react-router-dom";
import MenuRodape from "../components/MenuRodape";
import BotaoVoltar from "../components/BotaoVoltar";
import { useLocacao } from "../contexts/LocacaoContext";
import armario from "../assets/img/armario.jpg";
import armario2 from "../assets/img/armario2.jpg";

export default function Planos() {
  const { atualizarLocacao } = useLocacao();
  const navigate = useNavigate();

  const selecionarPlano = (idPlano, nomePlano, valorPlano) => {
    atualizarLocacao({ 
        idPlanoLocacao: idPlano, // <--- NOVO: ID do plano
        nomePlano: nomePlano, 
        valor: valorPlano 
    });
    navigate("/Locacao");
  };
  return (
    <div className="flex justify-center items-stretch min-h-screen w-screen bg-[#03033D]">
      
      {/* 2. CONTAINER SIMULANDO O CELULAR (Borda e Fundo). Tem altura fixa (h-screen) e é flex-col para organizar conteúdo (flex-1) e rodapé. */}
      <div className="flex flex-col h-screen w-full max-w-sm  bg-primary text-white relative">
        
        {/* 3. CONTEÚDO ROLÁVEL (Área principal). Ocupa o espaço restante (flex-1) e permite rolagem. */}
        <div className="flex-1 overflow-y-auto no-scrollbar pt-6 pb-20 px-4"> 
        <div className="flex justify-between items-center mb-4">
          <BotaoVoltar />
          <h1 className="text-2xl font-semibold text-white">Planos</h1>
        </div>

        <div className="w-70 h-[2px] bg-blue-500 mb-4"></div>
        
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Planos</h2>
          
          {/* Plano Semestral - USANDO ONCLICK */}
          <div onClick={() => selecionarPlano(1, "Semestral", 60.00)} className="block mb-5 cursor-pointer transform hover:scale-105 transition-transform">
           <img
              src={armario2}
              alt="Armário"
              className="w-full rounded-t-lg"
            />
            <div className="bg-gray-900 rounded-b-lg p-3">
              <div className="flex justify-between">
                <span className="text-white">Plano Semestral</span>
                <strong className="text-white">R$ 60,00</strong>
              </div>
            </div>
          </div>
            
          
          

         {/* Plano Anual - USANDO ONCLICK */}
          <div onClick={() => selecionarPlano(2, "Anual", 120.00)} className="block cursor-pointer transform hover:scale-105 transition-transform">
            <img
              src={armario2}
              alt="Armário"
              className="w-full rounded-t-lg"
            />
            <div className="bg-gray-900 rounded-b-lg p-3">
              <div className="flex justify-between">
                <span className="text-white">Plano Anual</span>
                <strong className="text-white">R$ 120,00</strong>
              </div>
            </div>
          </div>

          <MenuRodape />
        </div>
        </div>
      </div>
    </div>
  );
}