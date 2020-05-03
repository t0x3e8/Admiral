using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using code.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace code.api.Controllers
{
    [ApiController]
    [Authorize]
    public class PlayersController : ControllerBase
    {
        private readonly AppSettings appSettings;
        private readonly IPlayersRepository playersRepository;
        private readonly IMapper mapper;

        public PlayersController(IPlayersRepository playersRepository, IMapper mapper, IOptions<AppSettings> options)
        {
            this.playersRepository = playersRepository;
            this.appSettings = options?.Value;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("api/players/authenticate")]
        public ActionResult<PlayerAuthenticatedDTO> Authorize([FromBody]PlayerToAuthenticateDTO playerToAuthenticate)
        {
            var player = this.mapper.Map<Player>(playerToAuthenticate);
            var token = this.playersRepository.GenerateToken(player, this.appSettings.Secret);

            var playerToReturn = this.mapper.Map<PlayerAuthenticatedDTO>(player);
            playerToReturn.Token = token;

            return Ok(playerToReturn);

        }

        [HttpGet]
        [Route("api/games/{gameid}/players")]
        public ActionResult<IEnumerable<PlayerDTO>> GetPlayers(Guid gameId)
        {
            var players = this.playersRepository.GetPlayers(gameId);
            return Ok(this.mapper.Map<IEnumerable<PlayerDTO>>(players));
        }

        [HttpGet]
        [Route("api/games/{gameid}/players/{playerid}", Name = "GetPlayer")]
        public ActionResult<GameDTO> GetPlayer(Guid gameId, Guid playerId)
        {
            var player = this.playersRepository.GetPlayer(gameId, playerId);
            if (player == null)
                return NotFound();

            PlayerDTO playerDTO = this.mapper.Map<PlayerDTO>(player);

            return Ok(playerDTO);
        }
    
        [HttpPost]
        [Route("api/games/{gameid}/players")]
        public ActionResult<GameDTO> AddPlayer(Guid gameId, PlayerToCreateDTO playerToCreate)
        {
            var player = this.mapper.Map<Player>(playerToCreate);
            try
            {
                player = this.playersRepository.AddPlayer(gameId, player);
                if (player == null) 
                    return NotFound();
                    
                this.playersRepository.Save();
            }
            catch
            {
                return Problem("Error while creating the resource");
            }

            var playerToReturn = this.mapper.Map<PlayerDTO>(player);

            return CreatedAtRoute("GetPlayer", new { gameId, playerId = playerToReturn.Id }, playerToReturn);
        }
    }
}