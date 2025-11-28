import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Perfil() {
  const [popupSalvo, setPopupSalvo] = useState(false);
  const [foto, setFoto] = useState("https://via.placeholder.com/120");
  const navigate = useNavigate();

  const mudarFoto = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      setFoto(URL.createObjectURL(arquivo));
    }
  };

  return (
    <div className="relative min-h-screen pb-20 bg-[#0A0F3D] text-white">
      <div className="overflow-auto h-screen p-6 pt-10 pb-28">

        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="text-white w-7 h-7 mb-4" />
        </button>


        <div className="flex flex-col items-center">
          <label className="cursor-pointer">
            <img
              src={foto}
              className="w-32 h-32 rounded-full border-2 border-gray-300"
            />
            <input type="file" accept="image/*" className="hidden" onChange={mudarFoto} />
          </label>

          <p className="mt-3">valterhas123</p>
          <p className="text-sm text-gray-400">hans333@gmail.com</p>
        </div>


        <div className="mt-6 flex flex-col gap-4">
          <input
            className="p-3 rounded-lg text-black"
            placeholder="Nome"
          />

          <input
            className="p-3 rounded-lg text-black"
            placeholder="Telefone"
          />

          <input
            className="p-3 rounded-lg text-black"
            placeholder="Email"
          />

          
          <label className="flex items-center gap-3">
            Notificação
            <input type="checkbox" className="toggle-checkbox" />
          </label>

          <button
            onClick={() => setPopupSalvo(true)}
            className="bg-blue-600 p-3 rounded-lg mt-3"
          >
            Salvar alterações
          </button>
        </div>
      </div>

      
      {popupSalvo && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white text-black w-72 p-6 rounded-xl text-center">
            <h2 className="text-xl font-semibold">Alterações salvas!</h2>
            <button
              className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg"
              onClick={() => {
                setPopupSalvo(false);
                navigate("/conta/Conta");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
