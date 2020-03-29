using System;
using System.Collections.Generic;
using System.Linq;

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

        this.dbContext.Games.Add(game);
    }

    public Game GetGame(Guid gameId)
    {
        var query = from g in this.dbContext.Games
                    where g.Id.Equals(gameId)
                    select g;
        return query.FirstOrDefault();
    }

    public IEnumerable<Game> GetGames()
    {
        return this.dbContext.Games;
    }

    public int Save()
    {
        return this.dbContext.SaveChanges();
    }
}