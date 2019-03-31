using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class ClientService : IClientService
{
    public JwtSecurityToken GetJWT(string username, string secretKey)
    {
        var claims = new [] {
            new Claim(ClaimTypes.Name, username)
        };

        byte[] key = Encoding.UTF8.GetBytes(secretKey);
        SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(key);
        SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
        
        JwtSecurityToken token = new JwtSecurityToken(
          claims: claims,
          expires: DateTime.Now.AddMinutes(30),
          signingCredentials: credentials
        );

        return token;
    }
}