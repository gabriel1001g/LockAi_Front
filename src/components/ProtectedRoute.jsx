import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // 👈 Use o contexto

/**
 * Componente de Rota Protegida
 * @param {number[]} allowedRoles - Array de IDs de usuário permitidos (Ex: [1, 2])
 */
export default function ProtectedRoute({ allowedRoles = [] }) {
  const { isAuthenticated, tipoUsuarioId, isLoading } = useAuth();

  if (isLoading) {
    // Você pode retornar um spinner ou null. Retornar null mantém a tela atual.
    return <div>Carregando...</div>; 
  }

  // 1. Não autenticado: Redireciona para o Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Autenticado, mas sem permissão: Redireciona para uma página de acesso negado (opcional)
 if (allowedRoles.length > 0 && !allowedRoles.includes(tipoUsuarioId)) {
    console.warn(`Tentativa de acesso negado. Usuário Tipo: ${tipoUsuarioId}, Necessário: ${allowedRoles.join(', ')}`);
    return <Navigate to="/home" replace />; 
  }

  // 3. Permissão concedida: Renderiza o conteúdo aninhado (a rota)
  return <Outlet />;
}