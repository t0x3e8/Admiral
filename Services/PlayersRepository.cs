using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Linq;

public class PlayersRepository : IPlayersRepository
{
    private readonly AdmiralDbContext dbContext;

    public PlayersRepository(AdmiralDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public Player AddPlayer(Player player)
    {
        if (player == null)
            throw new ArgumentNullException(nameof(player));

        var playerEntity = this.dbContext.Players.FirstOrDefault(p => p.Id.Equals(player.Id));

        if (playerEntity == null)
            playerEntity = this.dbContext.Players.Add(player).Entity;

        return playerEntity;
    }

    public string GenerateToken(Player player, string secretKey)
    {
        var claims = new[] {
            new Claim(ClaimTypes.Name, player.Name),
            new Claim(ClaimTypes.NameIdentifier, player.Id.ToString())
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

    public bool PlayerExist(Player player)
    {
        if (player == null)
            throw new ArgumentNullException(nameof(player));

        return this.PlayerExist(player.Id);
    }

    public bool PlayerExist(Guid playerId)
    {
        var playerEntity = this.dbContext.Players.FirstOrDefault(p => p.Id.Equals(playerId));

        return playerEntity != null;
    }
}