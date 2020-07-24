using System;

public interface IGameStateManager
{
    void UpdateOnJoin(Guid gameId, Guid playerId);
    void UpdateOnLeave(Guid gameId, Guid playerId);
    void UpdateOnTurnCommit(Guid gameId, Guid playerId);
}