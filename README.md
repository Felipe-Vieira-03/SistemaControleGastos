# Sistema de Controle de Gastos

Sistema web para gerenciamento de pessoas, categorias e transações financeiras.

---

## Tecnologias

**Backend**
- .NET 10 (ASP.NET Core Web API)
- Autenticação via JWT

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui

---

## Pré-requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/) e npm (ou pnpm/bun)

---

## Como executar

### Backend

```bash
cd SistemaControleGastos.API
dotnet run
```

A API estará disponível em `https://localhost:7000` (ou a porta configurada no `launchSettings.json`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

> Configure a variável `VITE_API_URL` no arquivo `frontend/.env` apontando para a URL da API:
> ```
> VITE_API_URL=https://localhost:7000/api
> ```

---

## Funcionalidades

### Autenticação
- Cadastro e login de usuários com JWT

### Pessoas
- Cadastrar, editar, visualizar e excluir pessoas
- Nome: máximo de 200 caracteres

### Categorias
- Cadastrar, editar, visualizar e excluir categorias
- Finalidade: Despesa, Receita ou Ambas
- Descrição: máximo de 400 caracteres

### Transações
- Cadastrar, editar, visualizar e excluir transações financeiras
- Descrição: máximo de 400 caracteres
- Tipos: Despesa ou Receita

---

## Regras de negócio

- **Menor de idade**: pessoas com menos de 18 anos só podem ter transações do tipo **Despesa**. O campo de tipo é bloqueado automaticamente e apenas categorias compatíveis (Despesa ou Ambas) são exibidas.

---

## Estrutura do projeto

```
SistemaControleGastos/
├── SistemaControleGastos.API/          # Controllers e configuração da API
├── SistemaControleGastos.Application/  # Serviços e regras de aplicação
├── SistemaControleGastos.Domain/       # Entidades, DTOs e interfaces
├── SistemaControleGastos.Infrastructure/ # Repositórios e acesso a dados
└── frontend/                           # Aplicação React
    └── src/
        ├── pages/        # Páginas de cadastro
        │   └── grids/    # Grids com listagem, edição e exclusão
        ├── components/   # Componentes UI reutilizáveis
        ├── services/     # Comunicação com a API (apiFetch)
        └── lib/          # Types e utilitários
```
