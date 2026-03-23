using Microsoft.EntityFrameworkCore;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;
using SistemaControleGastos.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _db;
        public UsuarioRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task<bool> CadastrarUsuarioAsync(Usuario usuario)
        {
            var ret = _db.Usuarios.Add(usuario);
            await _db.SaveChangesAsync();
            return ret is not null;
        }

        public async Task<Usuario> ObterUsuarioPorId(int usuarioId)
        {
            var usuario = await _db.Usuarios.Where(w => w.Id == usuarioId).FirstOrDefaultAsync();
            return usuario;
        }

        public async Task<string> AutenticacaoAsync(string email, string senha)
        {
            return string.Empty;
        }
        public async Task<Usuario> ObterPorEmailSenha(string email, string senha)
        {
            var usuarioObj = await _db.Usuarios.Where(w => EF.Functions.Like(w.Email, email) && w.SenhaHash == senha).FirstOrDefaultAsync();
            return usuarioObj;
        }
    }
}
