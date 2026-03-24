import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import type { Transacao, Pessoa, Categoria } from "@/lib/types";
import { ETipoFinalidade, EFinalidade } from "@/lib/types";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeftRight, Plus, Pencil, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onNovo?: () => void;
}

function TipoBadge({ tipo }: { tipo: ETipoFinalidade }) {
  if (tipo === ETipoFinalidade.Despesa) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
        <TrendingDown className="size-3" />
        Despesa
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
      <TrendingUp className="size-3" />
      Receita
    </span>
  );
}

export default function TransacaoGrid({ onNovo }: Props) {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editando, setEditando] = useState<Transacao | null>(null);
  const [confirmandoDelete, setConfirmandoDelete] = useState<Transacao | null>(null);

  async function carregar() {
    const [t, p, c] = await Promise.all([
      apiFetch<Transacao[]>("/Transacao/ObterTodasTransacoesAsync"),
      apiFetch<Pessoa[]>("/Pessoa/ObterTodasPessoasAsync"),
      apiFetch<Categoria[]>("/Categoria/ObterTodasCategoriasAsync"),
    ]);
    setTransacoes(t);
    setPessoas(p);
    setCategorias(c);
  }

  useEffect(() => { carregar(); }, []);

  async function salvarEdicao() {
    if (!editando) return;
    try {
      await apiFetch("/Transacao/EditarTransacaoAsync", { method: "PUT", body: JSON.stringify(editando) });
      toast.success("Transação atualizada com sucesso!");
      setEditando(null);
      carregar();
    } catch {
      toast.error("Erro ao atualizar transação.");
    }
  }

  async function confirmarDelete() {
    if (!confirmandoDelete) return;
    try {
      await apiFetch(`/Transacao/DeletarTransacaoAsync?transacaoId=${confirmandoDelete.id}`, { method: "DELETE" });
      toast.success("Transação removida com sucesso!");
      setConfirmandoDelete(null);
      carregar();
    } catch {
      toast.error("Erro ao remover transação.");
    }
  }

  const nomePessoa = (id: number) => pessoas.find((p) => p.id === id)?.nome ?? "—";
  const nomeCategoria = (id: number) => categorias.find((c) => c.id === id)?.descricaoCategoria ?? "—";

  const pessoaEditando = pessoas.find((p) => p.id === editando?.pessoaId);
  const editandoMenor = (pessoaEditando?.idade ?? 18) < 18;
  const categoriasFiltradas = editandoMenor
    ? categorias.filter((c) => c.finalidade === EFinalidade.Despesa || c.finalidade === EFinalidade.Ambas)
    : categorias;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <ArrowLeftRight className="size-4 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Transações</h3>
            <p className="text-xs text-slate-400">
              {transacoes.length} registro{transacoes.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {onNovo && (
          <Button size="sm" onClick={onNovo} className="gap-1.5">
            <Plus className="size-3.5" />
            Novo
          </Button>
        )}
      </div>

      {/* Conteúdo */}
      {transacoes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-slate-300">
          <ArrowLeftRight className="size-10 mb-2" />
          <p className="text-sm text-slate-400">Nenhuma transação cadastrada</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wide">Descrição</TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wide">Valor</TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wide">Tipo</TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wide">Categoria</TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wide">Pessoa</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacoes.map((t) => (
              <TableRow key={t.id} className="hover:bg-slate-50/60 group">
                <TableCell className="font-medium text-slate-700 max-w-[180px] truncate">{t.descricao}</TableCell>
                <TableCell className="font-semibold text-slate-800 tabular-nums">
                  R$ {t.valor.toFixed(2)}
                </TableCell>
                <TableCell>
                  <TipoBadge tipo={t.tipoTransacao} />
                </TableCell>
                <TableCell className="text-slate-600 text-sm">{nomeCategoria(t.categoriaId)}</TableCell>
                <TableCell className="text-slate-600 text-sm">{nomePessoa(t.pessoaId)}</TableCell>
                <TableCell className="text-right w-20">
                  <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => setEditando({ ...t })}
                      className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => setConfirmandoDelete(t)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Dialog Editar */}
      <Dialog open={!!editando} onOpenChange={(open) => !open && setEditando(null)}>
        <DialogContent className="p-0 gap-0 border-0 shadow-none bg-transparent max-w-md">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full space-y-5">
            <h2 className="text-2xl font-semibold text-slate-800 text-center">Editar Transação</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Descrição</label>
                <input
                  type="text"
                  value={editando?.descricao ?? ""}
                  maxLength={400}
                  onChange={(e) => setEditando((prev) => prev && { ...prev, descricao: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors"
                />
                <span className="text-xs text-slate-400 text-right block mt-1">{(editando?.descricao ?? "").length}/400</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Valor</label>
                <input
                  type="number"
                  value={editando?.valor ?? ""}
                  min={0}
                  step="0.01"
                  onChange={(e) => setEditando((prev) => prev && { ...prev, valor: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Pessoa</label>
                <select
                  value={editando?.pessoaId ?? ""}
                  onChange={(e) => {
                    const novaId = Number(e.target.value);
                    const nova = pessoas.find((p) => p.id === novaId);
                    const menor = (nova?.idade ?? 18) < 18;
                    setEditando((prev) => prev && {
                      ...prev,
                      pessoaId: novaId,
                      tipoTransacao: menor ? ETipoFinalidade.Despesa : prev.tipoTransacao,
                    });
                  }}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors"
                >
                  <option value="">Selecione</option>
                  {pessoas.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Tipo
                  {editandoMenor && (
                    <span className="ml-1 text-xs font-normal text-amber-600">(menor de idade)</span>
                  )}
                </label>
                <select
                  value={editando?.tipoTransacao ?? ETipoFinalidade.Despesa}
                  onChange={(e) => setEditando((prev) => prev && { ...prev, tipoTransacao: Number(e.target.value) as ETipoFinalidade })}
                  disabled={editandoMenor}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value={ETipoFinalidade.Despesa}>Despesa</option>
                  {!editandoMenor && <option value={ETipoFinalidade.Receita}>Receita</option>}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoria</label>
                <select
                  value={editando?.categoriaId ?? ""}
                  onChange={(e) => setEditando((prev) => prev && { ...prev, categoriaId: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors"
                >
                  <option value="">Selecione</option>
                  {categoriasFiltradas.map((c) => (
                    <option key={c.id} value={c.id}>{c.descricaoCategoria}</option>
                  ))}
                </select>
              </div>
              {editandoMenor && (
                <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                  Pessoa menor de idade: apenas transações de <strong>despesa</strong> são permitidas.
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setEditando(null)}
                className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicao}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                Salvar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Confirmar Delete */}
      <Dialog open={!!confirmandoDelete} onOpenChange={(open) => !open && setConfirmandoDelete(null)}>
        <DialogContent className="p-0 gap-0 border-0 shadow-none bg-transparent max-w-sm">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full text-center space-y-5">
            <div className="size-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto">
              <Trash2 className="size-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Excluir transação?</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                <span className="font-medium text-slate-700">{confirmandoDelete?.descricao}</span> será removida permanentemente.<br />
                Essa ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmandoDelete(null)}
                className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarDelete}
                className="w-full bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
