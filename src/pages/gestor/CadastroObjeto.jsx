import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Ajuste o caminho conforme sua estrutura
import BotaoVoltar from "../../components/BotaoVoltar"; // Ajuste o caminho
import MenuGestor from "../../components/menuGestor"; // Ajuste o caminho

// URL DA API
const API_URL = "https://lockaiapii-g7egamgghuhrhrej.brazilsouth-01.azurewebsites.net";

export default function CadastroObjeto() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // Estados do Formulário
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    localidadePrimaria: "",
    localidadeSecundaria: "",
    localidadeTercearia: "",
    idTipoObjeto: "1", // Padrão: 1 (Ex: Armário)
  });

  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para Notificação (Pop-up)
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "", // 'success' ou 'error'
  });

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validação Simples
    if (!formData.nome || !formData.descricao || !formData.localidadePrimaria) {
      setNotification({
        isVisible: true,
        message: "Preencha os campos obrigatórios (Nome, Descrição, Localidade).",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setNotification({ isVisible: false, message: "", type: "" });

    try {
      // Montagem do Payload conforme seu Modelo C#
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        localidadePrimaria: formData.localidadePrimaria,
        localidadeSecundaria: formData.localidadeSecundaria,
        localidadeTercearia: formData.localidadeTercearia,
        
        // Campos fixos ou de sistema
        situacao: 1, // 1 = Ativo (SituacaoObjetoEnum)
        idTipoObjeto: parseInt(formData.idTipoObjeto),
        dtInclusao: new Date().toISOString(),
        idUsuarioInclusao: user?.id || 1, // Pega do contexto ou 1 se falhar
        dtAtualizao: new Date().toISOString(),
        idUsuarioAtualizacao: user?.id || 1
      };

      const response = await fetch(`${API_URL}/Objeto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 🚨 Envia o Token JWT
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Falha ao cadastrar objeto.");
      }

      // Sucesso
      setNotification({
        isVisible: true,
        message: "Objeto cadastrado com sucesso!",
        type: "success",
      });

      // Limpa formulário ou redireciona
      setTimeout(() => {
        // navigate("/gestor/HomeGestor"); // Descomente para voltar para home
        setFormData({ // Limpa o form para novo cadastro
            nome: "",
            descricao: "",
            localidadePrimaria: "",
            localidadeSecundaria: "",
            localidadeTercearia: "",
            idTipoObjeto: "1",
        });
        setNotification({ isVisible: false, message: "", type: "" });
      }, 2000);

    } catch (error) {
      console.error("Erro:", error);
      setNotification({
        isVisible: true,
        message: `Erro: ${error.message}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Container Principal (Layout Mobile)
    <div className="h-screen w-full bg-[#03033D] text-white flex flex-col px-4 pt-6 relative">
      
      {/* Cabeçalho */}
      <div className="mb-6 flex items-center gap-4">
        <BotaoVoltar />
        <h1 className="text-2xl font-bold">Novo Objeto</h1>
      </div>

      {/* Conteúdo Rolável (Formulário) */}
      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        
        <div className="space-y-4">
          
          {/* Nome */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Nome do Objeto *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Armário 105-B"
              className="w-full px-4 py-3 bg-white text-black rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Descrição *</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Detalhes sobre o objeto..."
              rows="3"
              className="w-full px-4 py-3 bg-white text-black rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* Tipo de Objeto (Simulado) */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Tipo</label>
            <select
              name="idTipoObjeto"
              value={formData.idTipoObjeto}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-black rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="1">Armário</option>
              <option value="2">Sala</option>
              <option value="3">Equipamento</option>
            </select>
          </div>

          <div className="w-full h-[1px] bg-gray-600 my-4"></div>
          <h3 className="text-lg font-semibold text-blue-300">Localização</h3>

          {/* Localidade Primária */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Local (Primário) *</label>
            <input
              type="text"
              name="localidadePrimaria"
              value={formData.localidadePrimaria}
              onChange={handleChange}
              placeholder="Ex: Prédio A"
              className="w-full px-4 py-3 bg-white text-black rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Localidade Secundária */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Andar/Setor (Secundário)</label>
            <input
              type="text"
              name="localidadeSecundaria"
              value={formData.localidadeSecundaria}
              onChange={handleChange}
              placeholder="Ex: 2º Andar"
              className="w-full px-4 py-3 bg-white text-black rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Localidade Terciária */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Referência (Terciária)</label>
            <input
              type="text"
              name="localidadeTercearia"
              value={formData.localidadeTercearia}
              onChange={handleChange}
              placeholder="Ex: Corredor Sul"
              className="w-full px-4 py-3 bg-white text-black rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Botão Salvar */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full mt-6 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform active:scale-95 ${
              isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-[#0066FF] hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Salvando..." : "Cadastrar Objeto"}
          </button>

        </div>
      </div>

      <MenuGestor />

      {/* Pop-up de Notificação */}
      {notification.isVisible && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 p-4 rounded-xl shadow-2xl text-white z-50 flex items-center gap-3 transition-all duration-300 w-[90%] max-w-sm ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span className="text-2xl">{notification.type === "success" ? "✅" : "❌"}</span>
          <p className="font-medium text-sm flex-1">{notification.message}</p>
          <button onClick={() => setNotification({ ...notification, isVisible: false })}>
            ✖
          </button>
        </div>
      )}

    </div>
  );
}