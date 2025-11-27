import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuGestor from "../../components/menuGestor";

export default function HomeGestor() {
  const navigate = useNavigate();
  const [planos, setPlanos] = useState([]);
  const [popupPlano, setPopupPlano] = useState(null); // plano selecionado para popup
  const [isEditing, setIsEditing] = useState(false); // modo edição no popup
  const [confirmDelete, setConfirmDelete] = useState(false); // confirma exclusão
  const [localForm, setLocalForm] = useState(null); // form local usado no popup

  // carrega planos do localStorage
  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("planosCriados")) || [];
    setPlanos(dados);
  }, []);

  // atualiza localStorage sempre que planos mudam
  useEffect(() => {
    localStorage.setItem("planosCriados", JSON.stringify(planos));
  }, [planos]);

  function abrirPopup(plano) {
    setPopupPlano(plano);
    setIsEditing(false);
    // cópia para edição local
    setLocalForm({
      nomePlano: plano.nomePlano,
      dataInicio: plano.dataInicio,
      dataFim: plano.dataFim,
      valor: plano.valor,
      pagamento: plano.pagamento,
    });
    setConfirmDelete(false);
  }

  function fecharPopup() {
    setPopupPlano(null);
    setIsEditing(false);
    setConfirmDelete(false);
    setLocalForm(null);
  }

  function salvarEdicao() {
    if (!localForm.nomePlano || !localForm.dataInicio || !localForm.dataFim || !localForm.valor || !localForm.pagamento) {
      // você pode trocar por popup de erro; aqui usamos alert simples
      alert("Preencha todos os campos antes de salvar.");
      return;
    }

    const novos = planos.map((p) =>
      p.id === popupPlano.id ? { ...p, ...localForm } : p
    );
    setPlanos(novos);
    // atualiza popup com os dados salvos
    const atualizado = novos.find((p) => p.id === popupPlano.id);
    setPopupPlano(atualizado);
    setIsEditing(false);
  }

  function solicitarDelete() {
    setConfirmDelete(true);
  }

  function confirmarDelete() {
    const novos = planos.filter((p) => p.id !== popupPlano.id);
    setPlanos(novos);
    fecharPopup();
  }

  return (
    <div className="min-h-screen w-full bg-[#03033D] text-white flex flex-col px-4 pt-6 pb-24">

      {/* Cabeçalho */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Olá, “Nome do Usuário”</h1>
      </div>

      {/* Adicionar plano */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Adicionar plano</h2>
        <div className="flex justify-center items-center">
          <button
            className="w-32 h-32 rounded-2xl border-[6px] border-blue-500 flex items-center justify-center bg-[#03033D]"
            onClick={() => navigate("/gestor/PlanoCategoria")}
          >
            <span className="text-6xl font-bold text-blue-500">+</span>
          </button>
        </div>
      </div>

      {/* Usar plano */}
      <div className="flex-1 overflow-y-auto pb-6">
        <h2 className="text-lg font-semibold mb-4">Usar plano</h2>

        {planos.length === 0 ? (
          <p className="text-center opacity-70">Nenhum plano cadastrado ainda.</p>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {planos.map((p) => (
              <div
                key={p.id}
                className="bg-[#0066FF] text-white rounded-3xl p-5 shadow w-full cursor-pointer"
                onClick={() => abrirPopup(p)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold mb-2">{p.nomePlano}</h3>
                  {/* se quiser ícone, coloque aqui */}
                </div>

                <div className="flex flex-wrap gap-4 text-sm mb-3">
                  <div>
                    <p className="opacity-80 text-xs">Início</p>
                    <p className="font-medium">{p.dataInicio}</p>
                  </div>
                  <div>
                    <p className="opacity-80 text-xs">Fim</p>
                    <p className="font-medium">{p.dataFim}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="opacity-80 text-xs">Valor</p>
                    <p className="font-medium">R$ {Number(p.valor).toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="opacity-80 text-xs">Pagamento</p>
                    <p className="font-medium">{p.pagamento}</p>
                  </div>
                </div>

                {/* Botão usar plano */}
                <button
                  className="mt-4 w-full bg-white text-[#0066FF] py-2 rounded-xl font-semibold"
                  onClick={(e) => {
                    e.stopPropagation(); // evita abrir o popup quando clicar "Usar plano"
                    // ação de usar o plano — você pode customizar
                    alert(`Plano "${p.nomePlano}" usado.`);
                  }}
                >
                  Usar plano
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <MenuGestor />

      {/* POPUP (detalhes + editar + apagar) */}
      {popupPlano && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <div className="bg-white text-black w-full max-w-md rounded-2xl p-6 shadow-xl">
            {/* cabeçalho do popup */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{popupPlano.nomePlano}</h3>
              <button
                className="text-sm text-gray-500"
                onClick={fecharPopup}
              >
                Fechar
              </button>
            </div>

            {/* conteúdo: se estiver editando, mostra inputs; se não, mostra texto */}
            {!isEditing ? (
              <div>
                <div className="space-y-2 mb-3">
                  <div>
                    <p className="text-xs opacity-70">Período</p>
                    <p>{popupPlano.dataInicio} até {popupPlano.dataFim}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Valor</p>
                    <p>R$ {Number(popupPlano.valor).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Pagamento</p>
                    <p>{popupPlano.pagamento}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </button>

                  <button
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold"
                    onClick={solicitarDelete}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Formulário de edição inline */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm">Categoria</label>
                  <input
                    type="text"
                    value={localForm?.nomePlano || ""}
                    onChange={(e) => setLocalForm({ ...localForm, nomePlano: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-sm">Início</label>
                      <input
                        type="date"
                        value={localForm?.dataInicio || ""}
                        onChange={(e) => setLocalForm({ ...localForm, dataInicio: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="text-sm">Fim</label>
                      <input
                        type="date"
                        value={localForm?.dataFim || ""}
                        onChange={(e) => setLocalForm({ ...localForm, dataFim: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <label className="text-sm">Valor</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={localForm?.valor || ""}
                    onChange={(e) => setLocalForm({ ...localForm, valor: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />

                  <label className="text-sm">Pagamento</label>
                  <select
                    value={localForm?.pagamento || ""}
                    onChange={(e) => setLocalForm({ ...localForm, pagamento: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Selecione...</option>
                    <option value="Pix">Pix</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Crédito">Cartão de crédito</option>
                    <option value="Débito">Cartão de débito</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold"
                    onClick={salvarEdicao}
                  >
                    Salvar
                  </button>

                  <button
                    className="flex-1 bg-gray-200 text-black py-2 rounded-lg font-semibold"
                    onClick={() => {
                      setIsEditing(false);
                      // restaura localForm para os dados do plano caso queira descartar alterações
                      setLocalForm({
                        nomePlano: popupPlano.nomePlano,
                        dataInicio: popupPlano.dataInicio,
                        dataFim: popupPlano.dataFim,
                        valor: popupPlano.valor,
                        pagamento: popupPlano.pagamento,
                      });
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* confirmação de exclusão secundária */}
            {confirmDelete && (
              <div className="mt-4 p-3 border-t">
                <p className="text-sm mb-3">Tem certeza que deseja apagar este plano? Esta ação não pode ser desfeita.</p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold"
                    onClick={confirmarDelete}
                  >
                    Sim, apagar
                  </button>
                  <button
                    className="flex-1 bg-gray-200 text-black py-2 rounded-lg font-semibold"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
