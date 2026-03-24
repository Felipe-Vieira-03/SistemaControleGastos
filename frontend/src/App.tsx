import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, Tag, ArrowLeftRight,
  LogOut, User, ChevronRight, Wallet,
} from "lucide-react";
import Login from "@/pages/Login";
import CadastroUsuario from "@/pages/Usuario";
import HomeScreen from "@/pages/Home";
import PessoaPage from "@/pages/Pessoa";
import CategoriaPage from "@/pages/Categoria";
import TransacaoPage from "@/pages/Transacao";
import PessoaGrid from "@/pages/grids/PessoaGrid";
import CategoriaGrid from "@/pages/grids/CategoriaGrid";
import TransacaoGrid from "@/pages/grids/TransacaoGrid";
import type { Usuario } from "./lib/types";
import { cn } from "@/lib/utils";

type Pagina = "home" | "login" | "cadastro-usuario" | "pessoa" | "categoria" | "transacao";

const navItems: { id: Pagina; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Dashboard", icon: LayoutDashboard },
  { id: "pessoa", label: "Pessoas", icon: Users },
  { id: "categoria", label: "Categorias", icon: Tag },
  { id: "transacao", label: "Transações", icon: ArrowLeftRight },
];

const pageTitles: Record<Pagina, string> = {
  home: "Dashboard",
  login: "Login",
  "cadastro-usuario": "Nova Conta",
  pessoa: "Pessoas",
  categoria: "Categorias",
  transacao: "Transações",
};

export default function App() {
  const [pagina, setPagina] = useState<Pagina>("home");
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if ((decoded.exp ?? 0) * 1000 > Date.now()) {
        setUsuario({ id: decoded.Id ?? decoded.id, email: decoded.Email ?? decoded.email, token });
      } else {
        localStorage.removeItem("token");
      }
    } catch {
      localStorage.removeItem("token");
    }
  }, []);

  function handleLoginSuccess(u: Usuario) {
    setUsuario(u);
    setPagina("home");
  }

  function handleLogout() {
    setUsuario(null);
    localStorage.removeItem("token");
    setPagina("home");
  }

  // Não logado
  if (!usuario) {
    if (pagina === "login") {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <Login
            onLoginSuccess={handleLoginSuccess}
            onIrParaCadastro={() => setPagina("cadastro-usuario")}
          />
        </div>
      );
    }
    if (pagina === "cadastro-usuario") {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <CadastroUsuario
            onCadastroSucesso={() => setPagina("login")}
            onVoltar={() => setPagina("login")}
          />
        </div>
      );
    }
    return <HomeScreen onIrParaLogin={() => setPagina("login")} />;
  }

  // Logado — layout com sidebar
  const renderContent = () => {
    switch (pagina) {
      case "pessoa":
        return <PessoaPage />;
      case "categoria":
        return <CategoriaPage />;
      case "transacao":
        return <TransacaoPage />;
      case "home":
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Olá,{" "}
                <span className="text-indigo-600">
                  {usuario.email.split("@")[0]}
                </span>
                !
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Aqui está um resumo das suas informações.
              </p>
            </div>
            <PessoaGrid onNovo={() => setPagina("pessoa")} />
            <CategoriaGrid onNovo={() => setPagina("categoria")} />
            <TransacaoGrid onNovo={() => setPagina("transacao")} />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-slate-900 flex flex-col">
        {/* Brand */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800">
          <div className="size-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/40">
            <Wallet className="size-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm tracking-tight">
            ControleGastos
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = pagina === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPagina(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Usuário */}
        <div className="p-3 border-t border-slate-800 space-y-0.5">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="size-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <User className="size-3.5 text-indigo-400" />
            </div>
            <p className="text-xs text-slate-400 truncate">{usuario.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="size-4 shrink-0" />
            Sair
          </button>
        </div>
      </aside>

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 gap-2">
          <span className="text-slate-400 text-sm">ControleGastos</span>
          <ChevronRight className="size-3.5 text-slate-300" />
          <span className="text-slate-800 text-sm font-semibold">
            {pageTitles[pagina]}
          </span>
        </header>

        {/* Conteúdo */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
