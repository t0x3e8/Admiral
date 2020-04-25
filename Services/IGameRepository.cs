using System;
using System.Collections.Generic;

public interface IGameRepository
{
    Game AddGame(Game game);
    IEnumerable<Game> GetGames();
    Game GetGame(Guid gameId, Guid playerId);
    Game GetGame(Guid gameId);
    Game UpdateGame(Game gameEntity, Player player, Pawn [] pawns);
    int Save();
    bool AddPlayerToGame(Guid gameId, Guid playerId);
}