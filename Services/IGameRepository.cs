using System.Collections.Generic;

public interface IGameRepository
{
    void AddGame(Game game);
    IEnumerable<Game> GetGames();
}