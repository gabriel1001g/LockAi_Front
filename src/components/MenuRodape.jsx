import { Home, Handshake, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MenuRodape() {
  return (
    <nav
      // 🚨 ALTERAÇÃO: Adicionado fixed, bottom-0 e classes de centralização para alinhamento com max-w-sm
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white border-t border-slate-700 w-full max-w-sm rounded-t-2xl shadow-lg z-10"
      aria-label="Menu de navegação"
    >
      {/* Menu em grid com 4 colunas */}
      <div className="grid grid-cols-4 gap-1 px-3 py-2 text-sm">
        
        {/* ==================== INÍCIO ==================== */}
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : "text-gray-300 hover:text-white"
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span>Início</span>
        </NavLink>

        {/* ==================== LOCAÇÕES ==================== */}
        <NavLink
          to="/UsuarioLocacao"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : "text-gray-300 hover:text-white"
            }`
          }
        >
          <Handshake className="w-6 h-6" />
          <span>Locações</span>
        </NavLink>

        {/* ==================== BUSCAR ==================== */}
        <NavLink
          to="/Categorias"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : "text-gray-300 hover:text-white"
            }`
          }
        >
          <Search className="w-6 h-6" />
          <span>Categorias</span>
        </NavLink>

        {/* ==================== CONTA ==================== */}
        <NavLink
          to="/conta/conta"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : "text-gray-300 hover:text-white"
            }`
          }
        >
          <User className="w-6 h-6" />
          <span>Conta</span>
        </NavLink>
      </div>
    </nav>
  );
}