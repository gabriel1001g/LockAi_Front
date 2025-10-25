import { useState } from "react";
import { Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

export default function Pagamento() {
  const navigate = useNavigate();
  const [copiado, setCopiado] = useState(false);
  const [comprovanteEnviado, setComprovanteEnviado] = useState(false);

  const copiarCodigo = () => {
    navigator.clipboard.writeText("etechas@etec.gov.sp.br");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleEnviarComprovante = () => {
    setComprovanteEnviado(true);
    setTimeout(() => setComprovanteEnviado(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#03033D] text-white relative justify-center items-center">
          <div></div>
          <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md mb-2">
            <div className="flex justify-between items-center mb-4">
              <BotaoVoltar />
              <h1 className="text-2xl font-semibold text-white">Pagamento</h1>
            </div>
    
            <div className="w-70 h-[2px] bg-blue-500 mb-4"></div>
    
            <div className="mb-2">
              <span className="text-white font-bold text-lg"></span>
            </div>

      <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md space-y-6">
        
        {/* Card do Plano */}
        <div className="p-5 bg-blue-600/30 border border-blue-700/50 rounded-xl shadow"
>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Plano</p>
              <p className="text-white font-medium">Anual</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Valor</p>
              <p className="text-white font-bold text-lg">R$ 120,00</p>
            </div>
          </div>
        </div>

        {/* Card de Posição e Localização */}
        <div className="p-5 bg-blue-600/30 border border-blue-700/50 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Posição</p>
              <p className="text-white font-medium">Alto</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Localização</p>
              <p className="text-white font-medium">Nr° 001</p>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col gap-6 mb-6">
          <h2 className="text-lg font-semibold text-white text-center">QRCODE PIX</h2>
          
          <div className="bg-white p-5 rounded-xl w-48 h-48 flex items-center justify-center mx-auto">
            <div className="text-center">
              <img 
                src="/src/assets/img/qrcode_pix.jpg" // 👈 Coloque aqui o caminho da sua imagem
                alt="QR Code PIX para pagamento"
                className="w-full h-full object-contain" // Ajusta a imagem para caber no contêiner
              />
            </div>
          </div>

          {/* Chave PIX */}
          <div>
            <p className="text-gray-400 text-sm mb-2 text-center">Chave PIX</p>
            <p className="text-secondary font-medium text-center break-all">
              etechas@etec.gov.sp.br
            </p>
          </div>
        </div>

        {/* Botões */}
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
            {comprovanteEnviado ? "Comprovante Enviado!" : "Enviar Comprovante"}
          </button>
        </div>
      </div>

      {/* Notificação */}
      {comprovanteEnviado && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg">
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