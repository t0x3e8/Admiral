using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class PlayersRepository : IPlayersRepository
{
    public string GenerateToken(string username, string secretKey)
    {
        var claims = new [] {
            new Claim(ClaimTypes.Name, username)
        };

        byte[] key = Encoding.UTF8.GetBytes(secretKey);
        SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(key);
        SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
        
        JwtSecurityToken token = new JwtSecurityToken(
          claims: claims,
          expires: DateTime.Now.AddDays(7),
          signingCredentials: credentials
        );

        string tokenText = new JwtSecurityTokenHandler().WriteToken(token);

        return tokenText;
    }
}