using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaControleGastos.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Infrastructure.Data.ContextConfig
{
    public class ConfigPessoa : IEntityTypeConfiguration<Pessoa>
    {
        public void Configure(EntityTypeBuilder<Pessoa> builder)
        {
            builder.HasOne<Usuario>()
                .WithMany()
                .HasForeignKey(t => t.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
