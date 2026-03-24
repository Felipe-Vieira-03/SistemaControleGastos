import { apiFetch } from "@/services/api";
import { useEffect, useState } from "react";
import type { Categoria } from "@/lib/types";
import type { Pessoa } from "@/lib/types";
import type { Transacao } from "@/lib/types";
import { EFinalidade } from "@/lib/types";
import { ETipoFinalidade } from "@/lib/types";


async function getCategorias() {
  return await apiFetch<Categoria[]>("/Categoria/ObterTodasCategoriasAsync");
}

async function getPessoas() {
  return await apiFetch<Pessoa[]>("/Pessoa/ObterTodasPessoasAsync");
}

export default function Transacao() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [pessoaId, setPessoaId] = useState<number | "">("");
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [tipoTransacao, setTipoTransacao] = useState<ETipoFinalidade>(ETipoFinalidade.Despesa);

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    async function carregarDados() {
      setPessoas(await getPessoas());
      setCategorias(await getCategorias());
    }
    carregarDados();
  }, []);

  async function cadastrar() {
    const payload = {
      descricao,
      valor,
      pessoaId,
      categoriaId,
      tipoTransacao,
    };

    await apiFetch("/Transacao/CadastrarTransacaoAsync", {
      method: "POST",
      body: JSON.stringify(payload),
    });

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Cadastro de Transação
        </h1>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição da transação
          </label>
          <input
            type="text"
            value={descricao}
            placeholder="Descrição"
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor
          </label>

          <input
            type="number"
            value={valor}
            placeholder="Valor"
            onChange={(e) => setValor(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quem efetuou a movimentação?
          </label>

          <select
            value={pessoaId}
            onChange={(e) => setPessoaId(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma pessoa</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Com o que?
          </label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.descricaoCategoria}
              </option>
            ))}
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo da transação
          </label>
          <select
            value={tipoTransacao}
            onChange={(e) =>
              setTipoTransacao(Number(e.target.value) as ETipoFinalidade)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={EFinalidade.Despesa}>Despesa</option>
            <option value={EFinalidade.Receita}>Receita</option>
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