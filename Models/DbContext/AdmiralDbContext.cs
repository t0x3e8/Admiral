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
                Id = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993"),
                Created = DateTime.Now,
                Status = 0,
            },
            new Game() {
                Id = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2994"),
                Created = DateTime.Today.AddHours(10),
                Status = 0,
            },
            new Game() {
                Id = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2995"),
                Created = DateTime.Today.AddHours(13),
                Status = 0,
            },
            new Game() {
                Id = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2996"),
                Created = DateTime.Today.AddHours(1),
                Status = 0,
            },
            new Game() {
                Id = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2997"),
                Created = DateTime.Today.AddHours(11),
                Status = 0,
            }
        );
        
        base.OnModelCreating(modelBuilder);
    }
}