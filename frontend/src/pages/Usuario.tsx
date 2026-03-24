"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { apiFetch } from "@/services/api";
import { Wallet } from "lucide-react";

interface CadastroUsuarioProps {
  onCadastroSucesso: () => void;
  onVoltar: () => void;
}

export default function CadastroUsuario({ onCadastroSucesso, onVoltar }: CadastroUsuarioProps) {
  const [email, setEmail] = useState("");
  const [SenhaHash, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const response = await apiFetch<boolean>("/Usuario/CadastrarUsuarioAsync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, SenhaHash }),
      });
      if (!response) {
        setErro("Erro ao cadastrar. Tente novamente.");
        return;
      }
      onCadastroSucesso();
    } catch {
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="size-12 rounded-2xl bg-indigo-500 flex items-center justify-center mb-3 shadow-lg shadow-indigo-500/30">
          <Wallet className="size-6 text-white" />
        </div>
        <span className="font-bold text-slate-800 text-lg">ControleGastos</span>
        <span className="text-slate-400 text-sm mt-0.5">Controle financeiro simples</span>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Criar conta</CardTitle>
          <CardDescription>Preencha os dados para criar sua conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCadastro} className="flex flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email-cad">E-mail</FieldLabel>
                <Input
                  id="email-cad"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="senha-cad">Senha</FieldLabel>
                <Input
                  id="senha-cad"
                  type="password"
                  placeholder="••••••••"
                  value={SenhaHash}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </Field>
            </FieldGroup>

            {erro && <p className="text-sm text-destructive">{erro}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Spinner className="size-4 mr-1" />}
              Criar conta
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onVoltar}
            >
              Voltar para o login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
