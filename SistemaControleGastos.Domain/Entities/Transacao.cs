using MathNet.Numerics;
using SistemaControleGastos.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Domain.Entities
{
    public class Transacao
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int PessoaId { get;set; }
        public int CategoriaId { get;set; }
        public string Descricao { get; set; }
        public decimal Valor {  get; set; }
        public ETipoTransacao TipoTransacao { get; set; }

    }

}
