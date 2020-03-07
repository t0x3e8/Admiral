using System.Collections.Generic;

public interface IGameRepository
{
    void CreateGame(Game game);
    IEnumerable<Game> GetGames();
}