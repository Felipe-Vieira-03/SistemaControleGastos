"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, LogOut, User } from "lucide-react";
import Login from "@/pages/Login";
import CadastroUsuario from "@/pages/Usuario";
import HomeScreen from "@/pages/Home";
import PessoaPage from "@/pages/Pessoa";
import CategoriaPage from "@/pages/Categoria";
import TransacaoPage from "@/pages/Transacao";
import type { Usuario } from "./lib/types";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { UsuarioDecode } from "@/lib/types";

type Pagina = "home" | "login" | "cadastro-usuario" | "pessoa" | "categoria" | "transacao";

export default function App() {
  const [pagina, setPagina] = useState<Pagina>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  function handleLoginSuccess(u: Usuario) {
    setUsuario(u);
    setPagina("home");
  }
  
function carregarEmailUsuario() {
const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode<UsuarioDecode>(token);

      const usuario: Usuario = {
        id: decoded.id,
        email: decoded.email,
        token: token,
      };
      setUsuario(usuario);
    } catch {
      console.log("Token inválido");
      localStorage.removeItem("token");
    }
  }
}

function handleLogout() {
  setUsuario(null); 
  localStorage.removeItem("token"); 
  setPagina("home");
  setMenuOpen(false);
}

  function navegar(p: Pagina) {
    setPagina(p);
    setMenuOpen(false);
  }

  const renderPagina = () => {
    switch (pagina) {
      case "login":
        return (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onIrParaCadastro={() => setPagina("cadastro-usuario")}
          />
          
        );
      case "cadastro-usuario":
        return (
          <CadastroUsuario
            onCadastroSucesso={() => setPagina("login")}
            onVoltar={() => setPagina("login")}
          />
        );
      case "pessoa":
        return <PessoaPage />;
      case "categoria":
        return <CategoriaPage />;
      case "transacao":
        return <TransacaoPage />;                
      case "home":
      default:
         if (!usuario) {
           return <HomeScreen onIrParaLogin={() => setPagina("login")} />;
         }
        return (
          <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Olá, {usuario.email}!
            </h1>
            <p className="text-muted-foreground">
              Utilize o menu para navegar pelo sistema.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-background px-4" >
        <Sheet open={menuOpen} onOpenChange={setMenuOpen} >
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Abrir menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-slate-700">
            <SheetHeader className="border-b px-6 py-4">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 p-4">
              {usuario ? (
                <>
                  {/* Info do usuário logado */}
                  <div className="mb-2 flex items-center gap-3 rounded-md bg-muted px-3 py-2">
                    <User className="size-4 shrink-0 text-muted-foreground" />
                    <div className="flex flex-col overflow-hidden">
                      { <span className="truncate text-xs text-muted-foreground">{usuario.email}</span>}
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => navegar("home")}
                  >
                    Início
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => navegar("pessoa")}
                  >
                    Pessoas
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => navegar("categoria")}
                  >
                    Categorias
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => navegar("transacao")}
                  >
                    Transações
                  </Button>

                  <Separator className="my-2" />

                  <Button
                    variant="ghost"
                    className="justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => navegar("login")}
                >
                  <LogIn className="size-4 mr-2" />
                  Login
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Botão de logout / login no header */}
        <div className="ml-auto">
          {usuario ? (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="size-4 mr-2" />
              Sair
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setPagina("login")}>
              <LogIn className="size-4 mr-2" />
              Login
            </Button>
          )}
        </div>
      </header>

      {/* Conteúdo */}
      <main>{renderPagina()}</main>
    </div>
  );
}
