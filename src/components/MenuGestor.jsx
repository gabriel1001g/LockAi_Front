import { Home, Handshake, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MenuGestor() {
  return (
    <nav
      className="absolute bottom-0 mx-auto mt-6 bg-slate-900 text-white border-t border-slate-700 w-full left-0 rounded-t-2xl shadow-lg"
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
          to="/categorias"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : "text-gray-300 hover:text-white"
            }`
          }
        >
          <Handshake className="w-6 h-6" />
          <span>Locações</span>
        </NavLink>

        {/* ==================== REQUERIMENTO ==================== */}
        <NavLink
          to="/requerimento"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-blue-500" : "text-gray-300 hover:text-white"
            }`
          }
        >
          <Search className="w-6 h-6" />
          <span>Requerimento</span>
        </NavLink>

        {/* ==================== CONTA ==================== */}
        <NavLink
          to="/conta"
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