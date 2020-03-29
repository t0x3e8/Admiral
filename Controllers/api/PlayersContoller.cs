using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using code.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace code.api.Controllers
{
    [ApiController]
    [Route("api/players")]
    [Authorize]
    public class PlayersController : ControllerBase
    {
        private readonly AppSettings appSettings;
        private readonly IPlayersRepository playersRepository;
        private readonly IMapper mapper;
     
        public PlayersController(IPlayersRepository playersRepository, IMapper mapper, IOptions<AppSettings> options)
        {
            this.playersRepository = playersRepository;
            this.appSettings = options.Value;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public ActionResult<PlayerDTO> Authorize([FromBody]PlayerToAuthenticateDTO playerToAuthenticate)
        {
            var player = this.mapper.Map<Player>(playerToAuthenticate);
            var token = this.playersRepository.GenerateToken(player.Name, this.appSettings.Secret);
            
            var playerToReturn = this.mapper.Map<PlayerDTO>(player);
            playerToReturn.Token = token;

            return Ok(playerToReturn);

        }
    }
}