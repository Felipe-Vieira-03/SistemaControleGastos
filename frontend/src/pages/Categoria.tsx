import { useState } from "react";
import { apiFetch } from "../services/api";

const EFinalidade = {
  Despesa: 1,
  Receita: 2,
  Ambas: 3,
} as const;

type EFinalidade = (typeof EFinalidade)[keyof typeof EFinalidade];

export default function Categoria() {
  const [descricaoCategoria, setDescricaoCategoria] = useState("");
  const [finalidade, setFinalidade] = useState<EFinalidade>(EFinalidade.Despesa);

  async function cadastrar() {
    await apiFetch("/Categoria/CadastrarCategoriaAsync", {
      method: "POST",
      body: JSON.stringify({
        descricaoCategoria,
        finalidade,
      }),
    });

    setDescricaoCategoria("");
    setFinalidade(EFinalidade.Despesa);
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6">
      
      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        Cadastro de Categoria
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          value={descricaoCategoria}
          placeholder="Descrição da categoria"
          onChange={(e) => setDescricaoCategoria(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={finalidade}
          onChange={(e) =>
            setFinalidade(Number(e.target.value) as EFinalidade)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={EFinalidade.Despesa}>Despesa</option>
          <option value={EFinalidade.Receita}>Receita</option>
          <option value={EFinalidade.Ambas}>Ambas</option>
        </select>
      </div>

      <button
        onClick={cadastrar}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Cadastrar
      </button>

    </div>
  </div>
);
}