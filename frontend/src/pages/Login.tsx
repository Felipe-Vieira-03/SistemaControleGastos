"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { apiFetch } from "@/services/api";
import type { Usuario } from "@/lib/types";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

interface LoginProps {
  onLoginSuccess: (usuario: Usuario) => void;
  onIrParaCadastro: () => void;
}

export default function Login({ onLoginSuccess, onIrParaCadastro }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiFetch("/Usuario/AuthAsync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!data?.token) {
        toast.error("E-mail ou senha inválidos.");
        return;
      }

      localStorage.setItem("token", data.token);
      const decoded = JSON.parse(atob(data.token.split(".")[1]));
      onLoginSuccess({ id: decoded.Id, email: decoded.Email, token: data.token });
    } catch {
      toast.error("Erro ao conectar com o servidor.");
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
          <CardTitle className="text-xl font-bold">Entrar</CardTitle>
          <CardDescription>Informe suas credenciais para acessar o sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="senha">Senha</FieldLabel>
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </Field>
            </FieldGroup>

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Spinner className="size-4 mr-1" />}
              Entrar
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onIrParaCadastro}
            >
              Criar uma conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
