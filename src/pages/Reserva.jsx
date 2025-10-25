import { Link, useLocation } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar"; // Assumindo que você tem este componente
import MenuRodape from "../components/MenuRodape"; // Assumindo que você tem este componente

export default function Reserva() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Captura os parâmetros da URL
    const posicao = queryParams.get('posicao') || 'Não informado';
    const localizacao = queryParams.get('local') || 'Não informado';
    
    
    const plano = "Plano Anual";
    const preco = "R$120,00";

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
                    
                    {/* Imagem do Armário com borda arredondada */}
                    <img
                        src="/src/assets/img/armario.jpg" // Use seu caminho de imagem
                        alt="Armário"
                        className="rounded-xl w-full border border-gray-700 shadow-xl mb-8"
                    />

                    {/* Informações da Reserva */}
                    <div className="w-full px-2 space-y-4 text-sm font-light">
                        
                        {/* Linha: Plano e Preço */}
                        <div className="flex justify-between items-center text-lg font-normal mb-6">
                            <span>{plano}</span>
                            <strong className="text-xl font-semibold">{preco}</strong>
                        </div>
                        
                        {/* Linha: Posição */}
                        <div className="flex justify-between">
                            <span className="font-normal">Posição</span>
                            <span className="font-semibold">{posicao}</span>
                        </div>
                        
                        {/* Linha: Localização */}
                        <div className="flex justify-between">
                            <span className="font-normal">Localização</span>
                            <span className="font-semibold">{localizacao}</span>
                        </div>
                        
                    </div>

                    {/* Botões */}
                    <div className="flex justify-between w-full mt-10 space-x-4">
                        <Link to="/locacao" className="w-1/2">
                            {/* Botão Voltar (fundo azul) */}
                            <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold transition-colors">
                                Voltar
                            </button>
                        </Link>
                        
                        <Link 
                           to="/pagamento" // Rota para a página de Pagamento
                           className="w-1/2"
                        >
                            <button 
                                className="w-full py-3 rounded-xl bg-white text-blue-600 hover:bg-gray-200 font-bold transition-colors"
                            >
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