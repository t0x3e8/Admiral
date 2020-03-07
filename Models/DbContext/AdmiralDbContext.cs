using System;
using Microsoft.EntityFrameworkCore;

public class AdmiralDbContext : DbContext {
    public DbSet<Game> Games { get; set; }

    public AdmiralDbContext(DbContextOptions options)
        :base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Game>().HasData(
            new Game() {
                Id = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993")
            }
        );
        
        base.OnModelCreating(modelBuilder);
    }
}