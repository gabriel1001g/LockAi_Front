import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuGestor from "../../components/menuGestor";
import { useAuth } from "../../contexts/AuthContext";

// URL DA API
const API_URL =
  "https://lockaiapii-g7egamgghuhrhrej.brazilsouth-01.azurewebsites.net";

export default function HomeGestor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, token } = useAuth();

  const [planos, setPlanos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const [popupPlano, setPopupPlano] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [localForm, setLocalForm] = useState(null);

  function recarregarPlanos() {
    setRefreshKey((prev) => prev + 1);
  }

  useEffect(() => {
    async function fetchPlanos() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/PlanoLocacao/GetAll?_t=${Date.now()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar planos: " + response.statusText);
        }

        const data = await response.json();

        const planosRaw = data.$values || [];

        const planosArray = planosRaw.filter((p) => !p.hasOwnProperty("$ref"));

        if (Array.isArray(planosArray)) {
          setPlanos(planosArray);
        } else {
          console.error("A API retornou um formato inesperado.");
          setPlanos([]);
        }
      } catch (error) {
        console.error("Erro ao buscar planos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlanos();
  }, [token, refreshKey]);

  useEffect(() => {
    if (location.state && location.state.reload) {
      console.log("Recarga forçada após criação de novo plano.");
      recarregarPlanos();
      navigate("/gestor/HomeGestor", { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const formatarData = (dataString) => {
    if (!dataString) return "--";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  const formatarDataInput = (dataString) => {
    if (!dataString) return "";
    return dataString.split("T")[0];
  };

  function abrirPopup(plano) {
    if (!plano || plano.hasOwnProperty("$ref")) return fecharPopup();

    setPopupPlano(plano);
    setIsEditing(false);

    setLocalForm({
      nomePlano: plano.nome,
      dataInicio: formatarDataInput(plano.dtInicio),
      dataFim: formatarDataInput(plano.dtFim),
      valor: plano.valor,
      pagamento: plano.prazoPagamento,
    });
    setConfirmDelete(false);
  }

  function fecharPopup() {
    setPopupPlano(null);
    setIsEditing(false);
    setConfirmDelete(false);
    setLocalForm(null);
  }

  async function salvarEdicao() {
    alert("Edição via API ainda não implementada neste exemplo (requer PUT).");
    recarregarPlanos();
    setIsEditing(false);
  }

  async function confirmarDelete() {
    alert(
      "Exclusão via API ainda não implementada neste exemplo (requer DELETE)."
    );
    recarregarPlanos();
    fecharPopup();
  }

  function solicitarDelete() {
    setConfirmDelete(true);
  }

  return (
    // Container principal: h-screen e flex-col para controle total da altura
    <div className="h-screen w-full bg-[#03033D] text-white flex flex-col px-4 pt-6">
      {/* Cabeçalho */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Olá, {username}</h1>
      </div>

      {/* Adicionar plano (Ajuste de margem de mb-6 para mb-2 para ganhar espaço) */}
      <div className="mb-2">
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

      {/* Lista de Planos */}
      {/* 🚨 CLASSE ADICIONADA: no-scrollbar para esconder a barra de rolagem */}
      <div className="flex-1 overflow-y-auto pb-24 pt-4 no-scrollbar">
        <h2 className="text-lg font-semibold mb-4">Planos Cadastrados</h2>

        {isLoading ? (
          <p className="text-center text-blue-400">Carregando planos...</p>
        ) : planos.length === 0 ? (
          <p className="text-center opacity-70">
            Nenhum plano cadastrado ainda.
          </p>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {planos.map((p) => {
              return (
                <div
                  key={p.id}
                  className="bg-[#0066FF] text-white rounded-3xl p-5 shadow w-full cursor-pointer hover:bg-blue-600 transition"
                  onClick={() => abrirPopup(p)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold mb-2">{p.nome}</h3>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm mb-3">
                    <div>
                      <p className="opacity-80 text-xs">Início</p>
                      <p className="font-medium">{formatarData(p.dtInicio)}</p>
                    </div>
                    <div>
                      <p className="opacity-80 text-xs">Fim</p>
                      <p className="font-medium">{formatarData(p.dtFim)}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="opacity-80 text-xs">Valor</p>
                      <p className="font-medium">
                        R$ {Number(p.valor).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="opacity-80 text-xs">Prazo (Dias)</p>
                      <p className="font-medium">{p.prazoPagamento}</p>
                    </div>
                  </div>

                  <div className="mt-3 text-center text-xs opacity-60">
                    Toque para detalhes
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <MenuGestor />

      {/* POPUP DE DETALHES (Sem alteração) */}
      {popupPlano && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <div className="bg-white text-black w-full max-w-md rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{popupPlano.nome}</h3>
              <button className="text-sm text-gray-500" onClick={fecharPopup}>
                Fechar
              </button>
            </div>

            {!isEditing ? (
              <div>
                <div className="space-y-2 mb-3">
                  <div>
                    <p className="text-xs opacity-70">Período</p>
                    <p>
                      {formatarData(popupPlano.dtInicio)} até{" "}
                      {formatarData(popupPlano.dtFim)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Valor</p>
                    <p>R$ {Number(popupPlano.valor).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Prazo Pagamento</p>
                    <p>{popupPlano.prazoPagamento} dias</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Horário Locação</p>
                    <p>
                      {popupPlano.inicioLocacao} às {popupPlano.fimLocacao}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </button>
                  <button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                    onClick={solicitarDelete}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ) : (
              // Lógica de edição (Inputs)
              <div>
                <h4 className="text-md font-bold mb-3">Editar Plano</h4>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-xs opacity-70 block mb-1">
                      Nome do Plano
                    </label>
                    <input
                      type="text"
                      value={localForm.nomePlano || ""}
                      onChange={(e) =>
                        setLocalForm({ ...localForm, nomePlano: e.target.value })
                      }
                      className="w-full border border-gray-300 p-2 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs opacity-70 block mb-1">
                      Valor (R$)
                    </label>
                    <input
                      type="number"
                      value={localForm.valor || 0}
                      onChange={(e) =>
                        setLocalForm({
                          ...localForm,
                          valor: Number(e.target.value),
                        })
                      }
                      className="w-full border border-gray-300 p-2 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
                    onClick={salvarEdicao}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}

            {/* Confirmação de Exclusão */}
            {confirmDelete && (
              <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-6 rounded-2xl">
                <p className="text-lg font-semibold mb-4 text-center">
                  Tem certeza que deseja apagar o plano{" "}
                  <span className="font-bold">{popupPlano.nome}</span>?
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg font-semibold transition"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                    onClick={confirmarDelete}
                  >
                    Confirmar Exclusão
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