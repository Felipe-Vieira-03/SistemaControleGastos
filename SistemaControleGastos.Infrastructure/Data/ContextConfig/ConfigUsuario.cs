using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaControleGastos.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Infrastructure.Data.ContextConfig
{
    public class ConfigUsuario : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.HasData(new[]
            {
                new Usuario {
                    Id = 1,
                    Email = "Zed",
                    SenhaHash = "83Ih5tGX1iS3Oz8pB/+Hqg==",
                    DataCadastro = DateTime.Now,
                },
            });
        }
    }
}
