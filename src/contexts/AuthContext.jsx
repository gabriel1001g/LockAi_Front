import { useState, createContext, useContext, useEffect } from 'react';

// 1. Criação do Contexto
const AuthContext = createContext();

// Função customizada para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext); // <-- Se esta for a linha 9
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

// 2. Provedor do Contexto
export const AuthProvider = ({ children }) => {
  // 1. NOVO ESTADO: Adicione um estado de carregamento
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

    // 🚨 NOVO: Define isLoading como false após a verificação inicial
    setIsLoading(false);
  }, [user]);

  // Função de Login: Salva os dados do usuário (incluindo token e tipoUsuarioId)
  const login = (userData) => {
    // userData deve ser o objeto retornado pela API: { token: '...', tipoUsuarioId: 1 ou 2, ... }
    setUser(userData);
  };

  // Função de Logout: Limpa o estado e redireciona
  const logout = () => {
    setUser(null);
  };

 const username = user?.usuarioNome || user?.nome || user?.username || 'Gestor';

  // Objeto de valor para o Provedor
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    // Garante que tipoUsuarioId seja null se user for null
    tipoUsuarioId: user ? user.tipoUsuarioId : null,
    token: user ? user.token : null,
    isLoading,
    username,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
