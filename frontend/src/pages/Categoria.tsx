import { useState } from "react";
import { apiFetch } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EFinalidade } from "@/lib/types";
import { toast } from "sonner";

export default function Categoria() {
  const [descricaoCategoria, setDescricaoCategoria] = useState("");
  const [finalidade, setFinalidade] = useState<EFinalidade>(EFinalidade.Despesa);
  const [loading, setLoading] = useState(false);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/Categoria/CadastrarCategoriaAsync", {
        method: "POST",
        body: JSON.stringify({ descricaoCategoria, finalidade }),
      });
      toast.success("Categoria cadastrada com sucesso!");
      setDescricaoCategoria("");
      setFinalidade(EFinalidade.Despesa);
    } catch {
      toast.error("Erro ao cadastrar categoria.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center py-10 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Cadastro de Categoria</CardTitle>
          <CardDescription>Preencha os dados para cadastrar uma categoria.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={cadastrar} className="flex flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="descricao">Descrição</FieldLabel>
                <Input
                  id="descricao"
                  type="text"
                  placeholder="Descrição da categoria"
                  value={descricaoCategoria}
                  maxLength={400}
                  onChange={(e) => setDescricaoCategoria(e.target.value)}
                  required
                />
                <span className="text-xs text-muted-foreground text-right">{descricaoCategoria.length}/400</span>
              </Field>
              <Field>
                <FieldLabel htmlFor="finalidade">Finalidade</FieldLabel>
                <select
                  id="finalidade"
                  value={finalidade}
                  onChange={(e) => setFinalidade(Number(e.target.value) as EFinalidade)}
                  className="h-8 w-full rounded-lg border border-input bg-white px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value={EFinalidade.Despesa}>Despesa</option>
                  <option value={EFinalidade.Receita}>Receita</option>
                  <option value={EFinalidade.Ambas}>Ambas</option>
                </select>
              </Field>
            </FieldGroup>

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
