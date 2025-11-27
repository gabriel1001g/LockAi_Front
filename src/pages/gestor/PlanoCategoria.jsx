import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../../components/botaoVoltar";
import MenuGestor from "../../components/menuGestor";

export default function PlanoCategoria() {
  const navigate = useNavigate();

  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [pagamento, setPagamento] = useState("");

  const [popup, setPopup] = useState(null);
  const [popupErro, setPopupErro] = useState(false); 

  const concluir = () => {
    if (!inicio || !fim || !categoria || !valor || !pagamento) {
      setPopupErro(true);
      return;
    }

    const novoPlano = {
      id: Date.now(),
      nomePlano: categoria,
      dataInicio: inicio,
      dataFim: fim,
      valor: valor,
      pagamento: pagamento,
    };

    const planosSalvos =
      JSON.parse(localStorage.getItem("planosCriados")) || [];

    planosSalvos.push(novoPlano);

    localStorage.setItem("planosCriados", JSON.stringify(planosSalvos));

    setPopup(novoPlano);
  };

  const fecharPopup = () => {
    setPopup(null);
    navigate("/gestor/HomeGestor");
  };

  return (
    <div className="min-h-screen bg-[#03033D] text-white px-6 pt-6 pb-24 relative">

      <BotaoVoltar />

      <h2 className="text-xl font-semibold mt-6 mb-6">Adicione a data</h2>

      <div className="flex justify-between gap-3 mb-8">
        <div className="flex flex-col w-1/2">
          <label className="mb-1 text-sm">Início</label>
          <input
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            className="bg-white text-black rounded-xl px-4 py-3"
          />
        </div>

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

      <div className="bg-[#2B2A40] -mx-6 px-6 py-5 mb-6">
        <h3 className="text-lg font-semibold mb-3">Categoria do plano</h3>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full bg-[#0066FF] text-white py-3 rounded-xl text-center font-semibold"
        >
          <option value="">Selecione...</option>
          <option value="Diário">Diário</option>
          <option value="Mensal">Mensal</option>
          <option value="Semestral">Semestral</option>
          <option value="Anual">Anual</option>
        </select>
      </div>

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

      <h3 className="text-lg font-semibold mb-2">Forma de pagamento</h3>

      <select
        value={pagamento}
        onChange={(e) => setPagamento(e.target.value)}
        className="w-full bg-white text-black px-4 py-3 rounded-xl mb-10"
      >
        <option value="">Selecione...</option>
        <option value="Pix">Pix</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Crédito">Cartão de crédito</option>
        <option value="Débito">Cartão de débito</option>
      </select>

      <button
        onClick={concluir}
        className="w-full bg-blue-600 py-3 rounded-xl text-white text-lg font-bold"
      >
        Concluir
      </button>

      <MenuGestor />

      {popup && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6">
          <div className="bg-white text-black rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-xl font-bold text-center mb-4 text-[#03033D]">
              Plano criado!
            </h2>

            <p><strong>Categoria:</strong> {popup.nomePlano}</p>
            <p><strong>Valor:</strong> R$ {popup.valor}</p>
            <p><strong>Período:</strong> {popup.dataInicio} até {popup.dataFim}</p>
            <p><strong>Pagamento:</strong> {popup.pagamento}</p>

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
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6">
          <div className="bg-white text-black rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Atenção!
            </h2>

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
