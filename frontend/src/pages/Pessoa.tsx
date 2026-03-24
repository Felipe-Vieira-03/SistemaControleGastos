import { useState } from "react";
import { apiFetch } from "../services/api";


export default function Pessoa() {
  const [nome, setNome] = useState<string>("");
  const [idade, setIdade] = useState<number>(0);

  async function cadastrar() {
    await apiFetch<{ success: boolean }>("/Pessoa/CadastrarPessoaAsync", {
      method: "POST",
      body: JSON.stringify({ nome, idade }),
    });
    setNome("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6">

        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Cadastro de Pessoa
        </h1>

        <div className="space-y-4">

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            value={nome}
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Idade
          </label>
          <input
            type="number"
            value={idade}
            placeholder="Idade"
            onChange={(e) => setIdade(e.target.valueAsNumber)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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