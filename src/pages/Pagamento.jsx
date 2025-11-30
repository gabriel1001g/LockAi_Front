import { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import { useLocacao } from "../contexts/LocacaoContext";
import { useAuth } from "../contexts/AuthContext";


// ** IMPORTANTE: Troque esta URL pela sua URL base da API **
const API_URL = "https://lockai.azurewebsites.net"; 

export default function Pagamento() {
  const navigate = useNavigate();
  const [copiado, setCopiado] = useState(false);
  const [comprovanteEnviado, setComprovanteEnviado] = useState(false);
  const { dadosLocacao, limparLocacao } = useLocacao();
  const { user } = useAuth(); // Assume que 'user' contém o ID do usuário logado

  const copiarCodigo = () => {
    navigator.clipboard.writeText("etechas@etec.gov.sp.br");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleEnviarComprovante = async () => {
    
    // 1. ** VERIFICAÇÃO E CONSTRUÇÃO DO PAYLOAD (IDs) **
    // A API espera: IdUsuario, IdPlanoLocacao, IdObjeto

    // Verifica se o usuário está logado e possui ID
    if (!user || !user.id || !user.token) { // 🚨 Adicionado: !user.token
        alert("Erro: Usuário não autenticado ou token ausente. Faça login novamente.");
        return;
    }
    
    // Verifica se os dados da locação (IDs) foram coletados nas telas anteriores
    if (!dadosLocacao.idPlanoLocacao || !dadosLocacao.idObjeto) {
        alert("Erro: Dados de Plano ou Objeto faltando. Por favor, volte e selecione.");
        return;
    }

    const payload = {
        IdUsuario: user.id, // Usando user.id (esperado)
        IdPlanoLocacao: dadosLocacao.idPlanoLocacao, // ID vindo do contexto
        IdObjeto: dadosLocacao.idObjeto, // ID vindo do contexto
    };

    setComprovanteEnviado(true);
console.log("Token JWT sendo enviado:", user.token);
    console.log("Enviando Proposta para API:", payload);

    
    try {
        const response = await fetch(`${API_URL}/PropostaLocacao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Se precisar de token, descomente e ajuste a linha abaixo:
                'Authorization': `Bearer ${user.token}` 
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ${response.status}: ${errorText || 'Falha desconhecida.'}`);
        }

        const data = await response.json();
        console.log("Proposta criada com sucesso:", data);
        
        // 3. ** FINALIZAÇÃO BEM SUCEDIDA **
        alert("Proposta de Locação enviada com sucesso! Aguardando confirmação de pagamento.");
        limparLocacao(); // Limpa o carrinho
        navigate("/home"); // Volta para home
        
    } catch (error) {
        console.error("Erro ao enviar proposta:", error.message);
        alert(`Erro ao finalizar locação: ${error.message}.`);
    } finally {
        setComprovanteEnviado(false);
    }
  };

  // Formatação para exibição
  const preco = dadosLocacao.valor
    ? `R$ ${dadosLocacao.valor.toFixed(2).replace(".", ",")}`
    : "R$ 0,00";

  return (
    <div className="flex flex-col min-h-screen bg-[#03033D] text-white relative justify-center items-center">
          <div></div>
          <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md mb-2">
            <div className="flex justify-between items-center mb-4">
              <BotaoVoltar />
              <h1 className="text-2xl font-semibold text-white">Pagamento</h1>
            </div>
    
            <div className="w-70 h-[2px] bg-blue-500 mb-4"></div>
    
      <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md space-y-6">
        
        {/* Card do Plano - DADOS DINÂMICOS */}
        <div className="p-5 bg-blue-600/30 border border-blue-700/50 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Plano</p>
              <p className="text-white font-medium">{dadosLocacao.plano || '--'}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Valor</p>
              <p className="text-white font-bold text-lg">{preco}</p>
            </div>
          </div>
        </div>

        {/* Card de Posição e Localização - DADOS DINÂMICOS */}
        <div className="p-5 bg-blue-600/30 border border-blue-700/50 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Posição</p>
              <p className="text-white font-medium">{dadosLocacao.posicao || '--'}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Localização</p>
              <p className="text-white font-medium">{dadosLocacao.localizacao || '--'}</p>
            </div>
          </div>
        </div>

        {/* ... (QR Code e Botões mantidos iguais) ... */}
        {/* QR Code */}
        <div className="flex flex-col gap-6 mb-6">
          <h2 className="text-lg font-semibold text-white text-center">QRCODE PIX</h2>
          
          <div className="bg-white p-5 rounded-xl w-48 h-48 flex items-center justify-center mx-auto">
            <div className="text-center">
              <img 
                src="/src/assets/img/qrcode_pix.jpg" 
                alt="QR Code PIX"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2 text-center">Chave PIX</p>
            <p className="text-secondary font-medium text-center break-all">
              etechas@etec.gov.sp.br
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={copiarCodigo}
            className="w-full bg-secondary text-white py-4 rounded-xl font-medium hover:bg-secondary transition-colors flex items-center justify-center"
          >
            {copiado ? "Código Copiado!" : "Copiar Código PIX"}
          </button>
          
          <button
            onClick={handleEnviarComprovante}
            className="w-full bg-terceary text-white py-4 rounded-xl font-medium hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            {comprovanteEnviado ? "Processando..." : "Enviar Comprovante"}
          </button>
        </div>
      </div>

      {comprovanteEnviado && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg z-50">
          <div className="flex items-center">
            <Check size={20} className="mr-2" />
            Comprovante enviado com sucesso!
          </div>
        </div>
      )}
    </div>
    </div>
  );
}