"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { apiFetch } from "@/services/api";
import type { Usuario } from "@/lib/types";

interface LoginProps {
  // onLoginSuccess: (usuario: Usuario) => void;
  onLoginSuccess: () => void;
  onIrParaCadastro: () => void;
}

export default function Login({ onLoginSuccess, onIrParaCadastro }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const response = await apiFetch("/Usuario/AuthAsync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });      
      if (!response) {
        setErro("E-mail ou senha inválidos.");
        return;
      }
      const data = await response.token;
      localStorage.setItem("token", data);
      // const user: Usuario = {email: email};
      // onLoginSuccess(user);
      onLoginSuccess()
    } catch {
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
          <CardDescription>
            Informe suas credenciais para acessar o sistema.
          </CardDescription>
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

            {erro && (
              <p className="text-sm text-destructive">{erro}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Spinner className="size-4 mr-2" />}
              Entrar
            </Button>

            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">ou</span>
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
