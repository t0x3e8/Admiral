using System.IdentityModel.Tokens.Jwt;

public interface IPlayersRepository
 {
    string GenerateToken(string username, string securityKey);
}