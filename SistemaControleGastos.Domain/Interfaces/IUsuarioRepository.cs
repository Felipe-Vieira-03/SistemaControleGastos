using SistemaControleGastos.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Domain.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<bool> CadastrarUsuario(Usuario usuario); 
        Task<Usuario> ObterUsuarioPorId(int usuarioId); 
        Task<string> AutenticacaoAsync(string email, string senha); 
        Task<Usuario> ObterPorEmailSenha(string email, string senha); 
    }
}
