using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Model
{
    public class Context : DbContext
    {
        public DbSet<Beneficiary> beneficiary { get; set; }

        public DbSet<Events> events { get; set; }

        public DbSet<EventsBeneficiary> eventsBeneficiary { get; set; }

        public DbSet<EventsBeneficiaryProduct> eventsBeneficiaryProduct { get; set; }

        public DbSet<Product> product { get; set; }

        public DbSet<Station> station { get; set; }

        public DbSet<StationProduct> stationProduct { get; set; }

        public DbSet<Badge> badges { get; set; }

        public DbSet<Stock> stock { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer("Server=ct0devsql.br.bosch.com;Database=ETSGrupo2;User Id=etsgrupo2;Password=bosch@ets@@grupo2;");
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<Beneficiary>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)/*.IsRequired()*/;
                entity.Property(e => e.Edv)/*.IsRequired()*/;
                entity.Property(e => e.Cpf)/*.IsRequired()*/;
                entity.Property(e => e.InclusionDate)/*.IsRequired()*/;
                entity.Property(e => e.User)/*.IsRequired()*/;
                entity.Property(e => e.ThirdParty)/*.IsRequired()*/;
                entity.Property(e => e.Area)/*.IsRequired()*/;
                entity.Property(e => e.BirthDate)/*.IsRequired()*/;
                entity.Property(e => e.Adm)/*.IsRequired()*/;
                entity.Property(e => e.IsActive)/*.IsRequired()*/;
            });

            modelBuilder.Entity<Events>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)/*.IsRequired()*/;
                entity.Property(e => e.Description)/*.IsRequired()*/;
                entity.Property(e => e.StartDate)/*.IsRequired()*/;
                entity.Property(e => e.EndDate)/*.IsRequired()*/;
                entity.Property(e => e.IsActive)/*.IsRequired()*/;
            });

            modelBuilder.Entity<EventsBeneficiary>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Evento);
                entity.HasOne(e => e.Beneficiario);
                entity.Property(e => e.BeneficiarioNomeado);
            });

            modelBuilder.Entity<EventsBeneficiaryProduct>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Quantity)/*.IsRequired()*/;
                entity.Property(e => e.DeliveredDate)/*.IsRequired()*/;
                entity.HasOne(e => e.EventosBeneficiario);
                entity.HasOne(e => e.Produto);
                entity.HasOne(e => e.DeliveredBeneficiary);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)/*.IsRequired()*/;
                entity.Property(e => e.UnitCost);
                entity.HasOne(e => e.Eventos);
            });

            modelBuilder.Entity<Station>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.IpAddress)/*.IsRequired()*/;
                entity.Property(e => e.Description)/*.IsRequired()*/;
                entity.Property(e => e.IsActive)/*.IsRequired()*/;
            });

            modelBuilder.Entity<StationProduct>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Station);
                entity.HasOne(e => e.Produtos);
            });

            modelBuilder.Entity<Badge>(entity =>
            {
                entity.HasKey(e => e.ID);
                entity.Property(e => e.Code);
                entity.Property(e => e.edv);
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Total);
                entity.HasOne(e => e.Product);
            });
        }
    }
}
