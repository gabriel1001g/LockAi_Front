import { Link } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar"; 
import MenuRodape from "../components/MenuRodape"; 
import { useLocacao } from "../contexts/LocacaoContext";
import armario1 from "../assets/img/armario.jpg";
import armario2 from "../assets/img/armario2.jpg";

export default function Reserva() {
    const { dadosLocacao } = useLocacao();
    
    // CORREÇÃO: Lendo as chaves CORRETAS do contexto
    const armário = dadosLocacao.nomeObjeto || "Armário não selecionado"; 
    const posicaoArmario = dadosLocacao.posicao || "N/A";
    const local = dadosLocacao.localizacao || "N/A";
    const planoSelecionado = dadosLocacao.nomePlano || "Plano não selecionado";
    const valorPlano = dadosLocacao.valor ? `R$ ${dadosLocacao.valor.toFixed(2).replace('.', ',')}` : "R$ 0,00";

    // Criando uma variável para exibir a POSIÇÃO + NOME, como um "Tipo" genérico.
    const tipoArmarioDisplay = `${armário} (${posicaoArmario})`;

    // Lógica simples para escolher a imagem (exemplo)
    const imagemArmario = (armário.toLowerCase().includes('pequeno') || armário.toLowerCase().includes('p')) ? armario2 : armario1;


    return (
        
        <div className="flex justify-center items-stretch min-h-screen w-screen bg-[#03033D]">
      
      {/* CONTAINER SIMULANDO O CELULAR */}
      <div className="flex flex-col h-screen w-full max-w-sm bg-primary text-white relative">
        
        {/* CONTEÚDO ROLÁVEL (Área principal) */}
        <div className="flex-1 overflow-y-auto no-scrollbar pt-6 pb-20 px-4"> 
                <div className="flex justify-between items-center mb-4">
                    <BotaoVoltar />
                    <h1 className="text-2xl font-semibold text-white">Reserva</h1>
                </div>
        
                <div className="w-70 h-[2px] bg-blue-500 mb-4"></div>

                <div className="flex flex-col items-center">
                    
                    {/* Imagem do Armário */}
                    <img
                        src={imagemArmario} // Usando a variável que contém o caminho
                        alt="Armário"
                        className="rounded-xl w-full border border-gray-700 shadow-xl mb-8"
                    />

                    <div className="w-full px-2 space-y-4 text-sm font-light">
                        
                        {/* Linha: Armário Selecionado */}
                        <div className="flex justify-between items-center text-md font-normal mb-2">
                            <span>Armário Selecionado</span>
                            <strong className="text-white">{tipoArmarioDisplay}</strong> 
                        </div>

                        {/* Linha: Plano e Preço */}
                        <div className="flex justify-between items-center text-lg font-normal mb-6">
                            <span>{planoSelecionado}</span>
                            <strong className="text-xl font-semibold">{valorPlano}</strong> 
                        </div>
                        
                        {/* Linha: Posição */}
                        <div className="flex justify-between">
                            <span className="font-normal">Posição</span>
                            <span className="font-semibold">{posicaoArmario}</span> 
                        </div>
                        
                        {/* Linha: Localização */}
                        <div className="flex justify-between">
                            <span className="font-normal">Localização (Nº)</span>
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
                </div>
                <MenuRodape /> 
            </div>
        </div>
    );
}