import { useState, createContext, useContext, useEffect } from 'react';

// 1. Criação do Contexto
const AuthContext = createContext();

// Função customizada para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext); 
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

// 2. Provedor do Contexto
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 3. Efeito para sincronizar estado com localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    setIsLoading(false);
  }, [user]);

  // Função de Login: Salva os dados do usuário
  // CORREÇÃO: Espera que o objeto 'userData' seja o objeto mapeado pelo frontend
  const login = (userData) => {
    // Agora o 'userData' já deve ter 'login', 'token', e 'tipoUsuarioId' na raiz,
    // conforme mapeado no componente Login.jsx
    setUser(userData);
  };

  // Função de Logout: Limpa o estado e redireciona
  const logout = () => {
    setUser(null);
  };

  // LÓGICA CORRIGIDA: Prioriza 'login' (que contém 'Gabriel11' no seu exemplo)
  // Depois verifica outros campos, e usa 'Usuário Logado' como último fallback se o user existir.
  const username = user?.login || user?.usuarioNome || user?.nome || user?.email || (user ? 'Usuário Logado' : 'Gestor');

  // Objeto de valor para o Provedor
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    // Garante que tipoUsuarioId e token sejam lidos da raiz do objeto 'user'
    tipoUsuarioId: user?.tipoUsuarioId || null,
    token: user?.token || null,
    isLoading,
    username,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};