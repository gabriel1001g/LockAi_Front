import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../../components/botaoVoltar";
import MenuGestor from "../../components/menuGestor";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = "https://lockaiapii-g7egamgghuhrhrej.brazilsouth-01.azurewebsites.net";

export default function PlanoCategoria() {
  const navigate = useNavigate();
  const { user, token } = useAuth(); // Para pegar o token e ID do usuário

  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  // NOVOS ESTADOS
  const [horaInicioLocacao, setHoraInicioLocacao] = useState("08:00");
  const [horaFimLocacao, setHoraFimLocacao] = useState("22:00");
  const [prazoPagamento, setPrazoPagamento] = useState("30"); // Prazo em dias

  const [popup, setPopup] = useState(null);
  const [popupErro, setPopupErro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const concluir = async () => {
    // Validação de campos obrigatórios
    if (!inicio || !fim || !categoria || !valor || !horaInicioLocacao || !horaFimLocacao || !prazoPagamento) {
      setPopupErro(true);
      return;
    }

    if (!token || !user?.id) {
      alert("Erro: Usuário não autenticado ou ID de usuário ausente. Faça login novamente.");
      return;
    }

    setIsLoading(true);

    try {
      // MONTAR O PAYLOAD COM OS NOVOS CAMPOS DINÂMICOS
      const payload = {
        nome: categoria,
        dtInicio: `${inicio}T00:00:00`, 
        dtFim: `${fim}T23:59:59`,
        valor: parseFloat(valor),
        
        // DADOS DINÂMICOS OBRIGATÓRIOS DO BACKEND
        inicioLocacao: horaInicioLocacao,
        fimLocacao: horaFimLocacao,
        prazoPagamento: parseInt(prazoPagamento, 10), // Converte para inteiro
        
        situacao: 1, // Exemplo: 1 = Ativo
        usuarioId: user.id 
      };

      console.log("Enviando Payload:", payload);

      // REQUISIÇÃO POST
      const response = await fetch(`${API_URL}/PlanoLocacao`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status}`);
      }

      const data = await response.json();
      console.log("Plano criado com sucesso:", data);

      // Atualiza estado local para mostrar popup de sucesso
      const planoParaPopup = {
        nomePlano: categoria,
        dataInicio: inicio,
        dataFim: fim,
        valor: valor,
        // Exibir informações adicionais
        horaInicio: horaInicioLocacao,
        prazo: prazoPagamento
      };
      setPopup(planoParaPopup);

    } catch (error) {
      console.error("Erro ao criar plano:", error);
      alert(`Falha ao criar plano: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fecharPopup = () => {
    setPopup(null);
    // 🚨 Redireciona para Home e FORÇA a recarga da lista
    navigate("/gestor/HomeGestor", { state: { reload: true } }); 
  };

  return (
    <div className="min-h-screen bg-[#03033D] text-white px-6 pt-6 pb-24 relative">

      <BotaoVoltar />

      <h2 className="text-xl font-semibold mt-6 mb-6">Adicione a data</h2>

      {/* Período de Validade (Datas) */}
      <div className="flex justify-between gap-3 mb-8">
        {/* Início */}
        <div className="flex flex-col w-1/2">
          <label className="mb-1 text-sm">Início</label>
          <input
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            className="bg-white text-black rounded-xl px-4 py-3"
          />
        </div>

        {/* Fim */}
        <div className="flex flex-col w-1/2">
          <label className="mb-1 text-sm">Fim</label>
          <input
            type="date"
            value={fim}
            onChange={(e) => setFim(e.target.value)}
            className="bg-white text-black rounded-xl px-4 py-3"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6">Defina o horário de locação</h2>

      {/* NOVOS CAMPOS: Horário de Locação */}
      <div className="flex justify-between gap-3 mb-8">
        {/* Hora Início */}
        <div className="flex flex-col w-1/2">
          <label className="mb-1 text-sm">Início Locação</label>
          <input
            type="time"
            value={horaInicioLocacao}
            onChange={(e) => setHoraInicioLocacao(e.target.value)}
            className="bg-white text-black rounded-xl px-4 py-3"
          />
        </div>
        
        {/* Hora Fim */}
        <div className="flex flex-col w-1/2">
          <label className="mb-1 text-sm">Fim Locação</label>
          <input
            type="time"
            value={horaFimLocacao}
            onChange={(e) => setHoraFimLocacao(e.target.value)}
            className="bg-white text-black rounded-xl px-4 py-3"
          />
        </div>
      </div>
      
      {/* Categoria do plano (Nome) */}
      <div className="bg-[#2B2A40] -mx-6 px-6 py-5 mb-6">
        <h3 className="text-lg font-semibold mb-3">Categoria do plano</h3>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full bg-[#0066FF] text-white py-3 rounded-xl text-center font-semibold"
        >
          <option value="">Selecione...</option>
          <option value="Plano Diário">Diário</option>
          <option value="Plano Mensal">Mensal</option>
          <option value="Plano Semestral">Semestral</option>
          <option value="Plano Anual">Anual</option>
        </select>
      </div>

      {/* VALOR */}
      <h3 className="text-lg font-semibold mb-2">Incluir valor do plano</h3>
      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Ex: 60.00"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="w-full bg-white text-black rounded-xl px-4 py-3 mb-6"
      />

      {/* NOVO CAMPO: Prazo de Pagamento */}
      <h3 className="text-lg font-semibold mb-2">Prazo de Pagamento (dias)</h3>
      <input
        type="number"
        min="1"
        placeholder="Ex: 30"
        value={prazoPagamento}
        onChange={(e) => setPrazoPagamento(e.target.value)}
        className="w-full bg-white text-black rounded-xl px-4 py-3 mb-10"
      />
      
      
      <button
        onClick={concluir}
        disabled={isLoading}
        className={`w-full py-3 rounded-xl text-white text-lg font-bold ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isLoading ? "Processando..." : "Concluir"}
      </button>

      <MenuGestor />

      {/* POPUPS (Sem alterações visuais, apenas o fecharPopup foi ajustado) */}
      {popup && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6 z-50">
          <div className="bg-white text-black rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-xl font-bold text-center mb-4 text-[#03033D]">Plano criado!</h2>
            <p><strong>Categoria:</strong> {popup.nomePlano}</p>
            <p><strong>Valor:</strong> R$ {parseFloat(popup.valor).toFixed(2)}</p>
            <p><strong>Período:</strong> {popup.dataInicio} até {popup.dataFim}</p>
            <p><strong>Horário de Locação:</strong> {popup.horaInicio} até {horaFimLocacao}</p>
            <p><strong>Prazo de Pagamento:</strong> {popup.prazo} dias</p>

            <button
              onClick={fecharPopup}
              className="mt-6 w-full bg-[#0066FF] text-white py-2 rounded-xl font-bold"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {popupErro && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6 z-50">
          <div className="bg-white text-black rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Atenção!</h2>
            <p className="text-lg">Preencha todos os campos para continuar.</p>
            <button
              onClick={() => setPopupErro(false)}
              className="mt-6 w-full bg-red-600 text-white py-2 rounded-xl font-bold"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}