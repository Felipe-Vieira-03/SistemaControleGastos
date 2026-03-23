export interface Usuario {
  id: number;
  email: string;
  token: string;
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export interface Categoria {
  id: number;
  descricaoCategoria: string;
  finalidade: EFinalidade;
}
export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipoTransacao: ETipoFinalidade;
  categoriaId: number;
  pessoaId: number;
  usuarioId: number
}

export enum EFinalidade
{
  Despesa = 1,
  Receita = 2, 
  Ambas = 3
}

export enum ETipoFinalidade
{
  Despesa = 1,
  Receita = 2, 
}

