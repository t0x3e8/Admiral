using System;
using Microsoft.EntityFrameworkCore;

public class AdmiralDbContext : DbContext
{
    public DbSet<Game> Games { get; set; }
    public DbSet<Pawn> Pawns { get; set; }
    public DbSet<Player> Players { get; set; }

    public DbSet<GamePlayer> GamesPlayers { get; set; }
    public AdmiralDbContext(DbContextOptions options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Player>().HasData(
            new Player()
            {
                Name = "Roman",
                Id = Guid.Parse("b80c661d-8ea9-4b10-a490-ce4625db3cc9")
            },
            new Player()
            {
                Name = "Wojtek",
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111")
            }
        );

        modelBuilder.Entity<Game>().HasData(
            new Game()
            {
                Id = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993"),
                Created = DateTime.Now,
                Status = 0,
                Name = "Game number 1"
            }
        );

        modelBuilder.Entity<Pawn>().HasData(
            new Pawn()
            {
                Id = Guid.Parse("111afe6d-e6af-40a9-c57b-08d7db3a097e"),
                Col = 2,
                OldCol = 0,
                Row = 2,
                OldRow = 0,
                Type = 2,
                PlayerId = Guid.Parse("b80c661d-8ea9-4b10-a490-ce4625db3cc9"),
                GameId = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993")
            },
            new Pawn()
            {
                Id = Guid.Parse("222afe6d-e6af-40a9-c57b-08d7db3a097e"),
                Col = 4,
                OldCol = 1,
                Row = 4,
                OldRow = 1,
                Type = 3,
                PlayerId = Guid.Parse("b80c661d-8ea9-4b10-a490-ce4625db3cc9"),
                GameId = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993")
            },
            new Pawn()
            {
                Id = Guid.Parse("333afe6d-e6af-40a9-c57b-08d7db3a097e"),
                Col = 4,
                OldCol = 1,
                Row = 4,
                OldRow = 1,
                Type = 3,
                PlayerId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                GameId = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993")
            },
            new Pawn()
            {
                Id = Guid.Parse("444afe6d-e6af-40a9-c57b-08d7db3a097e"),
                Col = 4,
                OldCol = 1,
                Row = 4,
                OldRow = 1,
                Type = 3,
                PlayerId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                GameId = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993")
            }
        );


        modelBuilder.Entity<GamePlayer>().HasData(
            new GamePlayer()
            {
                PlayerId = Guid.Parse("b80c661d-8ea9-4b10-a490-ce4625db3cc9"),
                GameId = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993")
            },
            new GamePlayer()
            {
                PlayerId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                GameId = Guid.Parse("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993")
            }
        );



        modelBuilder.Entity<GamePlayer>().HasKey(gp => new { gp.GameId, gp.PlayerId });
        modelBuilder.Entity<GamePlayer>().HasOne(g => g.Game).WithMany(gp => gp.Players).HasForeignKey(bc => bc.GameId);
        // modelBuilder.Entity<GamePlayer>().HasOne(p => p.Player).WithMany(gp => gp.Games).HasForeignKey(bc => bc.PlayerId);
    }
}