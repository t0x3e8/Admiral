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
                Id = Guid.NewGuid()
            }
        );
        
        base.OnModelCreating(modelBuilder);
    }
}