using System;
using System.Collections.Generic;

public interface IGamesRepository
{
    Game AddGame(Game game);
    IEnumerable<Game> GetGames();
    Game GetGame(Guid gameId);
    int Save();
}