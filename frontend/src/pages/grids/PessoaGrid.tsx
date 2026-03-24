import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";
import type { Pessoa } from "@/lib/types";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Users, Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onNovo?: () => void;
}

export default function PessoaGrid({ onNovo }: Props) {
  const [dados, setDados] = useState<Pessoa[]>([]);
  const [editando, setEditando] = useState<Pessoa | null>(null);
  const [confirmandoDelete, setConfirmandoDelete] = useState<Pessoa | null>(null);

  async function carregar() {
    const result = await apiFetch<Pessoa[]>("/Pessoa/ObterTodasPessoasAsync");
    setDados(result);
  }

  useEffect(() => { carregar(); }, []);

  async function salvarEdicao() {
    if (!editando) return;
    try {
      await apiFetch("/Pessoa/EditarPessoaAsync", { method: "PUT", body: JSON.stringify(editando) });
      toast.success("Pessoa atualizada com sucesso!");
      setEditando(null);
      carregar();
    } catch {
      toast.error("Erro ao atualizar pessoa.");
    }
  }

  async function confirmarDelete() {
    if (!confirmandoDelete) return;
    try {
      await apiFetch(`/Pessoa/DeletarPessoaAsync?pessoaId=${confirmandoDelete.id}`, { method: "DELETE" });
      toast.success("Pessoa removida com sucesso!");
      setConfirmandoDelete(null);
      carregar();
    } catch {
      toast.error("Erro ao remover pessoa.");
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <Users className="size-4 text-indigo-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Pessoas</h3>
            <p className="text-xs text-slate-400">
              {dados.length} registro{dados.length !== 1 ? "s" : ""}
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
      {dados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-slate-300">
          <Users className="size-10 mb-2" />
          <p className="text-sm text-slate-400">Nenhuma pessoa cadastrada</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wide">Nome</TableHead>
              <TableHead className="text-slate-500 font-medium text-xs uppercase tracking-wide">Idade</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {dados.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50/60 group">
                <TableCell className="font-medium text-slate-700">{p.nome}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">{p.idade} anos</span>
                    {p.idade < 18 && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                        <AlertTriangle className="size-3" />
                        Menor
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right w-20">
                  <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => setEditando({ ...p })}
                      className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => setConfirmandoDelete(p)}
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
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 text-center">Editar Pessoa</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome</label>
                <input
                  type="text"
                  value={editando?.nome ?? ""}
                  maxLength={200}
                  onChange={(e) => setEditando((prev) => prev && { ...prev, nome: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors"
                />
                <span className="text-xs text-slate-400 text-right block mt-1">{(editando?.nome ?? "").length}/200</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Idade</label>
                <input
                  type="number"
                  value={editando?.idade ?? ""}
                  min={0}
                  onChange={(e) => setEditando((prev) => prev && { ...prev, idade: e.target.valueAsNumber })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-colors"
                />
              </div>
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
              <h3 className="text-lg font-semibold text-slate-800">Excluir pessoa?</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                <span className="font-medium text-slate-700">{confirmandoDelete?.nome}</span> será removida permanentemente.<br />
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
