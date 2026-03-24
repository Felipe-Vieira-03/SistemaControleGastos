import { useState } from "react";
import { apiFetch } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function Pessoa() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/Pessoa/CadastrarPessoaAsync", {
        method: "POST",
        body: JSON.stringify({ nome, idade }),
      });
      toast.success("Pessoa cadastrada com sucesso!");
      setNome("");
      setIdade("");
    } catch {
      toast.error("Erro ao cadastrar pessoa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center py-10 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Cadastro de Pessoa</CardTitle>
          <CardDescription>Preencha os dados para cadastrar uma pessoa.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={cadastrar} className="flex flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nome">Nome</FieldLabel>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Nome completo"
                  value={nome}
                  maxLength={200}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
                <span className="text-xs text-muted-foreground text-right">{nome.length}/200</span>
              </Field>
              <Field>
                <FieldLabel htmlFor="idade">Idade</FieldLabel>
                <Input
                  id="idade"
                  type="number"
                  placeholder="Idade"
                  value={idade}
                  min={0}
                  onChange={(e) => setIdade(e.target.valueAsNumber)}
                  required
                />
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
