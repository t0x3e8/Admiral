using System;
using System.Collections.Generic;

public class GameRepository : IGameRepository
{
    private readonly AdmiralDbContext dbContext;

    public GameRepository(AdmiralDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public void CreateGame(Game game)
    {
        if (game == null)
            throw new ArgumentNullException(nameof(game));

        game.Id = Guid.NewGuid();
        this.dbContext.Games.Add(game);
    }

    public IEnumerable<Game> GetGames()
    {
        return this.dbContext.Games;
    }
}