import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Criação do Contexto
const AuthContext = createContext();

// Função customizada para usar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. Provedor do Contexto
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Pega o estado inicial do localStorage, se existir
  const [user, setUser] = useState(() => {
    // Tenta obter o objeto 'user' (que deve conter token e tipoUsuarioId)
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
  }, [user]);

  // Função de Login: Salva os dados do usuário (incluindo token e tipoUsuarioId)
  const login = (userData) => {
    // userData deve ser o objeto retornado pela API: { token: '...', tipoUsuarioId: 1 ou 2, ... }
    setUser(userData);
  };

  // Função de Logout: Limpa o estado e redireciona
  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  // Objeto de valor para o Provedor
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    // Garante que tipoUsuarioId seja null se user for null
    tipoUsuarioId: user ? user.tipoUsuarioId : null,
    token: user ? user.token : null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};