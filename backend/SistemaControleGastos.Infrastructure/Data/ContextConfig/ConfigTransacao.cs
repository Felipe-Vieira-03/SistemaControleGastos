using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaControleGastos.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Infrastructure.Data.ContextConfig
{
    public  class ConfigTransacao : IEntityTypeConfiguration<Transacao>
    {
        public void Configure(EntityTypeBuilder<Transacao> builder)
        {
            builder.HasOne<Usuario>()
                .WithMany()
                .HasForeignKey(t => t.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Pessoa>()
                .WithMany()
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Categoria>()
                .WithMany()
                .HasForeignKey(t => t.CategoriaId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(p => p.Valor).HasPrecision(20, 4);
       }
    }
}
