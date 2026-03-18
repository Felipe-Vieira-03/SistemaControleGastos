using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;
using SistemaControleGastos.Domain.Interfaces.Service;
using SistemaControleGastos.Domain.Interfaces.Utils;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Application.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _repo;
        private readonly ICriptografiaUtils _cripto;
        private readonly ITokenService _token;
        public UsuarioService(IUsuarioRepository repo, ICriptografiaUtils cripto, ITokenService token)
        {
            _repo = repo;
            _cripto = cripto;
            _token = token;
        }

        public async Task<bool> CadastrarUsuario(Usuario usuario)
        {
            var ret = await _repo.CadastrarUsuario(usuario);
            return ret;
        }

        public async Task<Usuario> ObterUsuarioPorId(int usuarioId)
        {
            var ret = await _repo.ObterUsuarioPorId(usuarioId);
            return ret;
        }
        public async Task<string> AutenticacaoAsync(string email, string senha)
        {
            var senhaCrypto = _cripto.EncryptString(senha);
            var usuario = await _repo.ObterPorEmailSenha(email, senhaCrypto);

            if (usuario is null)
                throw new Exception("Usuário não encontrado");

            var token = _token.GerarToken(usuario.Id, usuario.Email, usuario.DataCadastro);
            return token;
        }
    }
}
