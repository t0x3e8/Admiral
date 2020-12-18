using System;
using System.Collections.Generic;

public interface IPawnsRepository
{
    IEnumerable<Pawn> GetPawns(Guid gameId, Guid playerId);
    Pawn GetPawn(Guid gameId, Guid playerId, Guid pawnId);
    IEnumerable<Pawn> GetPawnsByPosition(Guid gameId, int column, int row);
    IEnumerable<Pawn> AddPawns(Guid gameId, Guid playerId, IEnumerable<Pawn> pawns);
    int Save();
}