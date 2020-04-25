using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class GameRepository : IGameRepository
{
    private readonly AdmiralDbContext dbContext;
    private readonly int HiddenPawnType = -1;
    private readonly IPlayersRepository playersRepository;

    public GameRepository(AdmiralDbContext dbContext, IPlayersRepository playersRepository)
    {
        this.dbContext = dbContext;
        this.playersRepository = playersRepository;
    }

    public Game AddGame(Game game)
    {
        if (game == null)
            throw new ArgumentNullException(nameof(game));
        if (game.Players == null || game.Players.Count != 1)
            throw new ArgumentException($"{nameof(game)}: A new game must have one player");

        // Set PlayerId for each pawn
        game.Pawns.ForEach(p => p.PlayerId = game.Players[0].PlayerId);

        var result = this.dbContext.Games.Add(game);
        return result.Entity;
    }

    public Game UpdateGame(Game gameEntity, Player player, Pawn[] pawns)
    {
        if (gameEntity == null)
            throw new ArgumentNullException("Game must be exisiting entity");

        if (player == null)
            throw new ArgumentNullException("Player cannot be null");

        var playerEntity = this.playersRepository.AddPlayer(player);
        gameEntity.Players.Add(new GamePlayer()
        {
            PlayerId = playerEntity.Id,
            GameId = gameEntity.Id
        });

        foreach (var pawn in pawns)
        {
            pawn.PlayerId = playerEntity.Id;
            gameEntity.Pawns.Add(pawn);
        }

        return gameEntity;
    }

    public Game GetGame(Guid gameId, Guid playerId)
    {
        /// Query includes pawns and players
        var query = from g in this.dbContext.Games.Include(x => x.Pawns).Include(x => x.Players).ThenInclude(x => x.Player)
                    where g.Id.Equals(gameId)
                    select g;

        Game game = query.FirstOrDefault();
        if (game != null)
        {
            this.dbContext.Entry(game).State = EntityState.Detached;
            game.Pawns.ForEach(p =>
            {
            // For each Pawn not matching playerID the type of the Pawn is set to HiddenPawnType
            if (!p.PlayerId.Equals(playerId))
                    p.Type = this.HiddenPawnType;
            });
        }

        return game;
    }

    public Game GetGame(Guid gameId)
    {
        // Do NOT include Pawns
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

    public bool AddPlayerToGame(Guid gameId, Guid playerId)
    {
        Game gameEntity = this.GetGame(gameId);

        if (gameEntity != null)
        {
            if (!this.playersRepository.PlayerExist(playerId))
            {
                gameEntity.Players.Add(new GamePlayer() { PlayerId = playerId, GameId = gameId });
                return true;
            }
        }

        return false;
    }
}