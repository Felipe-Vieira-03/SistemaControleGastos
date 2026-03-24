import { useState, useEffect } from "react";
import { apiFetch } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Categoria, Pessoa } from "@/lib/types";
import { EFinalidade, ETipoFinalidade } from "@/lib/types";
import { toast } from "sonner";

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-white px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50 disabled:cursor-not-allowed";

export default function Transacao() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number | "">("");
  const [pessoaId, setPessoaId] = useState<number | "">("");
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [tipoTransacao, setTipoTransacao] = useState<ETipoFinalidade>(ETipoFinalidade.Despesa);
  const [loading, setLoading] = useState(false);

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const pessoaSelecionada = pessoas.find((p) => p.id === pessoaId);
  const menorDeIdade = (pessoaSelecionada?.idade ?? 18) < 18;

  const categoriasFiltradas = menorDeIdade
    ? categorias.filter((c) => c.finalidade === EFinalidade.Despesa || c.finalidade === EFinalidade.Ambas)
    : categorias;

  useEffect(() => {
    Promise.all([
      apiFetch<Pessoa[]>("/Pessoa/ObterTodasPessoasAsync"),
      apiFetch<Categoria[]>("/Categoria/ObterTodasCategoriasAsync"),
    ]).then(([p, c]) => {
      setPessoas(p);
      setCategorias(c);
    });
  }, []);

  useEffect(() => {
    if (menorDeIdade) {
      setTipoTransacao(ETipoFinalidade.Despesa);
      const catAtual = categorias.find((c) => c.id === categoriaId);
      if (catAtual?.finalidade === EFinalidade.Receita) setCategoriaId("");
    }
  }, [menorDeIdade]);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/Transacao/CadastrarTransacaoAsync", {
        method: "POST",
        body: JSON.stringify({ descricao, valor, pessoaId, categoriaId, tipoTransacao }),
      });
      toast.success("Transação cadastrada com sucesso!");
      setDescricao("");
      setValor("");
      setPessoaId("");
      setCategoriaId("");
      setTipoTransacao(ETipoFinalidade.Despesa);
    } catch {
      toast.error("Erro ao cadastrar transação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center py-10 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Cadastro de Transação</CardTitle>
          <CardDescription>Preencha os dados para cadastrar uma transação.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={cadastrar} className="flex flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="descricao">Descrição</FieldLabel>
                <Input
                  id="descricao"
                  type="text"
                  placeholder="Descrição da transação"
                  value={descricao}
                  maxLength={400}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
                <span className="text-xs text-muted-foreground text-right">{descricao.length}/400</span>
              </Field>
              <Field>
                <FieldLabel htmlFor="valor">Valor</FieldLabel>
                <Input
                  id="valor"
                  type="number"
                  placeholder="0,00"
                  value={valor}
                  min={0}
                  step="0.01"
                  onChange={(e) => setValor(Number(e.target.value))}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="pessoa">Pessoa</FieldLabel>
                <select
                  id="pessoa"
                  value={pessoaId}
                  onChange={(e) => { setPessoaId(Number(e.target.value)); setCategoriaId(""); }}
                  className={selectClass}
                  required
                >
                  <option value="">Selecione uma pessoa</option>
                  {pessoas.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </Field>
              <Field>
                <FieldLabel htmlFor="categoria">Categoria</FieldLabel>
                <select
                  id="categoria"
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(Number(e.target.value))}
                  className={selectClass}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categoriasFiltradas.map((c) => (
                    <option key={c.id} value={c.id}>{c.descricaoCategoria}</option>
                  ))}
                </select>
              </Field>
              <Field>
                <FieldLabel htmlFor="tipo">
                  Tipo
                  {menorDeIdade && (
                    <span className="ml-1 text-xs font-normal text-amber-600">(menor de idade)</span>
                  )}
                </FieldLabel>
                <select
                  id="tipo"
                  value={tipoTransacao}
                  onChange={(e) => setTipoTransacao(Number(e.target.value) as ETipoFinalidade)}
                  disabled={menorDeIdade}
                  className={selectClass}
                >
                  <option value={ETipoFinalidade.Despesa}>Despesa</option>
                  {!menorDeIdade && <option value={ETipoFinalidade.Receita}>Receita</option>}
                </select>
              </Field>
            </FieldGroup>

            {menorDeIdade && (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                Pessoa menor de idade: apenas transações de <strong>despesa</strong> são permitidas.
              </p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Spinner className="size-4 mr-2" />}
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
