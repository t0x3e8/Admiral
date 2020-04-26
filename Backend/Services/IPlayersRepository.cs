using System;
using System.IdentityModel.Tokens.Jwt;

public interface IPlayersRepository
 {
    string GenerateToken(Player player, string securityKey);
    Player AddPlayer(Player player);
    bool PlayerExist(Player player);
    bool PlayerExist(Guid playerId);
}