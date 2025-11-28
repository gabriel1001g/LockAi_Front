import React, { createContext, useContext, useState } from "react";

const LocacaoContext = createContext();

export const useLocacao = () => {
  return useContext(LocacaoContext);
};

export const LocacaoProvider = ({ children }) => {
  // Estado para armazenar os dados da locação
  const [dadosLocacao, setDadosLocacao] = useState({
    objeto: null, // Ex: "Armário", "Notebook"
    tipoObjeto: null, // Ex: "Escolar", "Correspondência"
    plano: null, // Ex: "Semestral", "Anual"
    valor: null, // Ex: 60.00, 120.00
    posicao: null, // Ex: "Alto", "Médio"
    localizacao: null, // Ex: "Nº 001"
  });

  // Função para atualizar partes do estado
  const atualizarLocacao = (dados) => {
    setDadosLocacao((prev) => ({ ...prev, ...dados }));
  };

  // Função para limpar os dados (após finalizar)
  const limparLocacao = () => {
    setDadosLocacao({
      objeto: null,
      tipoObjeto: null,
      plano: null,
      valor: null,
      posicao: null,
      localizacao: null,
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