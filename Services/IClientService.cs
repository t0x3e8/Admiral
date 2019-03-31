using System.IdentityModel.Tokens.Jwt;

public interface IClientService {
    JwtSecurityToken GetJWT(string username, string securityKey);
}