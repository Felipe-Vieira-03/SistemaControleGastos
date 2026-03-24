"use client";

import { Button } from "@/components/ui/button";
import { LogIn, Wallet, ShieldCheck, BarChart3, Users } from "lucide-react";

interface HomeProps {
  onIrParaLogin: () => void;
}

export default function Home({ onIrParaLogin }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-sm shadow-indigo-500/40">
            <Wallet className="size-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">ControleGastos</span>
        </div>
        <Button
          onClick={onIrParaLogin}
          size="sm"
          className="bg-white/10 hover:bg-white/15 text-white border border-white/10"
        >
          <LogIn className="size-3.5" />
          Entrar
        </Button>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
          <ShieldCheck className="size-3.5" />
          Simples, seguro e eficiente
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-5 max-w-3xl">
          Controle total das suas{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            finanças
          </span>
        </h1>

        <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
          Gerencie transações, categorias e pessoas em um único lugar.
          Organização financeira sem complicação.
        </p>

        <Button
          size="lg"
          onClick={onIrParaLogin}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 h-11 text-base shadow-lg shadow-indigo-500/30"
        >
          Começar agora
          <LogIn className="size-4" />
        </Button>
      </main>

      {/* Features */}
      <section className="px-8 pb-16 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Users,
              title: "Pessoas",
              desc: "Cadastre e gerencie pessoas vinculadas às suas movimentações financeiras.",
            },
            {
              icon: BarChart3,
              title: "Categorias",
              desc: "Organize suas transações com categorias de despesa, receita ou ambas.",
            },
            {
              icon: Wallet,
              title: "Transações",
              desc: "Registre entradas e saídas com controle completo do seu fluxo de caixa.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white/5 border border-white/10 rounded-xl p-5 text-left hover:bg-white/[0.08] transition-colors"
            >
              <div className="size-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3">
                <f.icon className="size-4 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1.5">{f.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
