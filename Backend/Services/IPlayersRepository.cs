using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

public interface IPlayersRepository
 {
    string GenerateToken(Player player, string securityKey);
    IEnumerable<Player> GetPlayers(Guid gameId);
    Player GetPlayer(Guid gameId, Guid playerId);
    int Save();
    Player AddPlayer(Guid gameId, Player player);
}