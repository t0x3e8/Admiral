using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Collections.Generic;

public class PawnsRepository : IPawnsRepository
{
    private readonly AdmiralDbContext dbContext;

    public PawnsRepository(AdmiralDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public IEnumerable<Pawn> GetPawns(Guid gameId, Guid playerId)
    {
        var query = from p in this.dbContext.Pawns
                    where p.GameId.Equals(gameId) && p.PlayerId.Equals(playerId)
                    select p;

        return query;
    }
    
    public Pawn GetPawn(Guid gameId, Guid playerId, Guid pawnId) {
        var query = from p in this.dbContext.Pawns
                    where p.GameId.Equals(gameId) && p.PlayerId.Equals(playerId) && p.Id.Equals(pawnId)
                    select p;

        return query.SingleOrDefault();
    }

    public IEnumerable<Pawn> AddPawns(Guid gameId, Guid playerId, IEnumerable<Pawn> pawns) {
        if (gameId.Equals(Guid.Empty))
            throw new ArgumentException(nameof(gameId));
            
        if (playerId.Equals(Guid.Empty))
            throw new ArgumentException(nameof(gameId));
        
        // Checks whether guidId is linked to existing entity
        var gpGame = (from gp in this.dbContext.GamesPlayers
                      where gp.GameId.Equals(gameId) && gp.PlayerId.Equals(playerId)
                      select gp.Game).FirstOrDefault();
        if (gpGame == null)
            return null;

        IList<Pawn> pawnsToReturn = new List<Pawn>();
        foreach(var pawn in pawns) {
            pawn.GameId = gameId;
            pawn.PlayerId = playerId;
            pawnsToReturn.Add(this.dbContext.Pawns.Add(pawn).Entity);
        }

        return pawnsToReturn;
    }
    
    public int Save()
    {
        return this.dbContext.SaveChanges();
    }
}