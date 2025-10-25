import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BotaoVoltar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // sempre volta uma tela no histórico
  };

  return (
    <div className="p-4 flex items-center">
      <button
        onClick={handleClick}
        className="bg-blue-600 p-2 rounded-full"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}