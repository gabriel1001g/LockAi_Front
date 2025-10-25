
import BotaoVoltar from "../components/BotaoVoltar";

export default function RecuperarSenha() { 

  return (
    <div className="flex flex-col min-h-screen bg-background px-6 relative">
      
      <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md mx-auto mt-20">
        <BotaoVoltar />
        <h1 className="text-xl font-semibold text-white mb-4">Recuperar Senha</h1>
        
        <form>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            E-mail
          </label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full px-3 py-2 mb-4 bg-terceary text-gray-300 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-lg font-medium hover:bg-secondary"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}


