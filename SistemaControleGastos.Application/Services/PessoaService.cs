using MathNet.Numerics.Distributions;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Application.Services
{
    public class PessoaService
    {
        private readonly IPessoaRepository _repo;
        private readonly TokenDto _token;

        public PessoaService(IPessoaRepository repo, TokenDto token)
        {
            _repo = repo;
            _token = token;

        }

        public async Task<bool> CadastrarPessoaAsync(Pessoa pessoa)
        {
            pessoa.UsuarioId = _token.Id;
            var pessoaExiste = await _repo.PessoaJaExiste(pessoa.Id);
            if (pessoaExiste)
                throw new Exception("Pessoa já existe");

            var ret = await _repo.CadastrarPessoaAsync(pessoa);
            return ret;
        }
        public async Task<bool> DeletarPessoaAsync(int pessoaId)
        {
            var pessoaExiste = await _repo.PessoaJaExiste(pessoaId);
            if (!pessoaExiste)            
                throw new Exception("Pessoa não encontrada");
            var ret = await _repo.DeletarPessoaAsync(pessoaId);
            return ret;
            
        }
        public async Task<bool> EditarPessoaAsync(Pessoa pessoa)
        {
            var pessoaExiste = await _repo.PessoaJaExiste(pessoa.Id);
            if (!pessoaExiste)
                throw new Exception("Pessoa não encontrada");

            var ret = await _repo.EditarPessoaAsync(pessoa);
            return ret;
        }

        public async Task<Pessoa> ObterPessoaPorIdAsync(int pessoaId)
        {
            var pessoa = await _repo.ObterPessoaPorIdAsync(pessoaId);
            if (pessoa is null)
                throw new Exception("Pessoa não encontrada");
            return pessoa;

        }

        public async Task<List<Pessoa>> ObterTodasPessoasAsync()
        {
            var listPessoas = await _repo.ObterTodasPessoasAsync();
            return listPessoas;
        }
    }
}
