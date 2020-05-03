using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Collections.Generic;

public class PlayersRepository : IPlayersRepository
{
    private readonly AdmiralDbContext dbContext;

    public PlayersRepository(AdmiralDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public IEnumerable<Player> GetPlayers(Guid gameId)
    {
        var query = from gp in this.dbContext.GamesPlayers
                    where gp.GameId.Equals(gameId)
                    select gp.Player;

        return query;
    }

    public Player GetPlayer(Guid gameId, Guid playerId)
    {
        var query = from gp in this.dbContext.GamesPlayers
                    where gp.GameId.Equals(gameId) && gp.PlayerId.Equals(playerId)
                    select gp.Player;

        return query.FirstOrDefault();
    }

    public Player AddPlayer(Guid gameId, Player player)
    {
        if (player == null)
            throw new ArgumentNullException(nameof(player));

        if (gameId.Equals(Guid.Empty))
            throw new ArgumentException(nameof(gameId));

        // Checks whether guidId is linked to existing entity
        var game = (from g in this.dbContext.Games
                      where g.Id.Equals(gameId)
                      select g).FirstOrDefault();
        if (game == null)
            return null;

        // Checks whether player is already linked to gameid
        var gpPlayer = (from gp in this.dbContext.GamesPlayers
                        where gp.GameId.Equals(gameId) && gp.PlayerId.Equals(player.Id)
                        select gp.Player).FirstOrDefault();
        if (gpPlayer != null)
            return gpPlayer;

        // Stores in database            
        var playerToReturn = this.dbContext.Players.FirstOrDefault(p => p.Id.Equals(player.Id));
        if(playerToReturn == null)
            playerToReturn = this.dbContext.Players.Add(player).Entity;
        this.dbContext.GamesPlayers.Add(new GamePlayer() { PlayerId = playerToReturn.Id, GameId = gameId });

        return playerToReturn;
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

    public int Save()
    {
        return this.dbContext.SaveChanges();
    }
}