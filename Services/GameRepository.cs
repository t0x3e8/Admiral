using System;
using System.Collections.Generic;

public class GameRepository : IGameRepository
{
    private readonly AdmiralDbContext dbContext;

    public GameRepository(AdmiralDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public void AddGame(Game game)
    {
        if (game == null)
            throw new ArgumentNullException(nameof(game));

        game.Id = Guid.NewGuid();
        this.dbContext.Games.Add(game);
        this.dbContext.SaveChanges();
    }

    public IEnumerable<Game> GetGames()
    {
        return this.dbContext.Games;
    }
}