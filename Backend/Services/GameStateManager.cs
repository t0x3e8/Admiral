using System;

public class GameStateManager : IGameStateManager
{
    private IGamesRepository gamesRepository;
    public GameStateManager(IGamesRepository gamesRepository)
    {
        this.gamesRepository = gamesRepository;
    }

    public void UpdateOnJoin(Guid gameId, Guid playerId)
    {
        var game = gamesRepository.GetGame(gameId);

        if (game != null)
        {
            if (game.ActivePlayer.HasValue)
            {
                if (game.Players.Count == 2)
                {
                    game.Status = 1;
                }
            }
            else
            {
                game.ActivePlayer = playerId;
            }

            gamesRepository.Save();
        }
    }

    public void UpdateOnLeave(Guid gameId, Guid playerId)
    {
        throw new NotImplementedException();
    }

    public void UpdateOnTurnCommit(Guid gameId, Guid playerId)
    {
        var game = gamesRepository.GetGame(gameId);

        if (game != null)
        {
            var notActivePlayer = game.Players.Find(gp => !gp.PlayerId.Equals(game.ActivePlayer.Value));

            game.ActivePlayer = notActivePlayer.PlayerId;
            gamesRepository.Save();
        }
    }
}