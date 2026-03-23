"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface HomeProps {
  onIrParaLogin: () => void;
}

export default function Home({ onIrParaLogin }: HomeProps) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">
        Bem-vindo ao sistema
      </h1>
      <p className="max-w-md text-muted-foreground text-pretty leading-relaxed">
        Faça login para acessar as funcionalidades do sistema e gerenciar suas informações.
      </p>
      <Button size="lg" onClick={onIrParaLogin}>
        <LogIn className="size-4 mr-2" />
        Fazer login
      </Button>
    </div>
  );
}
