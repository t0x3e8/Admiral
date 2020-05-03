using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class GamesRepository : IGamesRepository
{
    private readonly AdmiralDbContext dbContext;

    public GamesRepository(AdmiralDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public Game AddGame(Game game)
    {
        if (game == null)
            throw new ArgumentNullException(nameof(game));

        var gameEntity = this.dbContext.Games.Add(game).Entity;
        return gameEntity;
    }

    public Game GetGame(Guid gameId)
    {
        var query = from g in this.dbContext.Games.Include(x => x.Players).ThenInclude(x => x.Player)
                    where g.Id.Equals(gameId)
                    select g;

        return query.FirstOrDefault();
    }

    public IEnumerable<Game> GetGames()
    {
        var query = from g in this.dbContext.Games.Include(x => x.Players).ThenInclude(x => x.Player)
                    select g;

        return query;
    }

    public int Save()
    {
        return this.dbContext.SaveChanges();
    }
}