using Microsoft.EntityFrameworkCore;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Infrastructure.Data.ContextConfig;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Transacao> Transacoes{ get; set; }
        public DbSet<Usuario> Usuarios{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ConfigUsuario());
            modelBuilder.ApplyConfiguration(new ConfigTransacao());
        }
    }
}
