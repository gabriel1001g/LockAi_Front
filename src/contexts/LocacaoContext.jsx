// src/contexts/LocacaoContext.jsx

import React, { createContext, useContext, useState } from "react";

const LocacaoContext = createContext();

export const useLocacao = () => {
  return useContext(LocacaoContext);
};

export const LocacaoProvider = ({ children }) => {
  // Estado para armazenar os dados da locação
  const [dadosLocacao, setDadosLocacao] = useState({
    
    // 🚨 APENAS DADOS DE OBJETO ESPECÍFICO E PLANO:
    
    // 1. OBJETO (Armário/Item selecionado na tela Locacao.jsx com mapeamento estático)
    idObjeto: null,       // O ID necessário para a requisição de pagamento
    nomeObjeto: null,     // Nome para exibição (Ex: "Armário A1")
    posicao: null,        // Posição (Ex: "Alto")
    localizacao: null,    // Local (Ex: "Nº 001")
    
    // 2. PLANO (selecionado em Planos.jsx)
    idPlanoLocacao: null, // O ID necessário para a requisição de pagamento
    nomePlano: null,      // Nome do Plano para exibição (Ex: "Semestral")
    valor: null,          // Valor para exibição e cálculo
  });

  // Função para atualizar partes do estado
  const atualizarLocacao = (dados) => {
    setDadosLocacao((prev) => ({ ...prev, ...dados }));
  };

  // Função para limpar os dados (após finalizar)
  const limparLocacao = () => {
    setDadosLocacao({
      idObjeto: null,
      nomeObjeto: null,
      posicao: null,
      localizacao: null,
      idPlanoLocacao: null,
      nomePlano: null,
      valor: null,
    });
  };

  const value = {
    dadosLocacao,
    atualizarLocacao,
    limparLocacao,
  };

  return (
    <LocacaoContext.Provider value={value}>{children}</LocacaoContext.Provider>
  );
};