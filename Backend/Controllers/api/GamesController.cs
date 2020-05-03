
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;

namespace code.api.Controllers
{
    [ApiController]
    [Route("api/games")]
    [Authorize]
    public class GamesController : ControllerBase
    {
        private readonly IGamesRepository gameRepository;
        private readonly IMapper mapper;

        public GamesController(IGamesRepository gameRepository, IMapper mapper)
        {
            this.gameRepository = gameRepository ?? throw new ArgumentNullException("Game Repository cannot be null");
            this.mapper = mapper ?? throw new ArgumentNullException("Mapper cannot be null");
        }

        [HttpOptions]
        public IActionResult GetGameOptions()
        {
            Response.Headers.Add("Allow", "GET, OPTIONS, POST");
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<GameDTO>> GetGames()
        {
            var games = this.gameRepository.GetGames();
            return Ok(this.mapper.Map<IEnumerable<GameDTO>>(games));
        }

        [HttpPost]
        public ActionResult<GameDTO> AddGame(GameToCreateDTO gameToCreate)
        {
            var game = this.mapper.Map<Game>(gameToCreate);
            try
            {
                game = this.gameRepository.AddGame(game);
                this.gameRepository.Save();
            }
            catch
            {
                return Problem("Error while creating the resource");
            }

            var gameToReturn = this.mapper.Map<GameDTO>(game);

            return CreatedAtRoute("GetGame", new { gameId = gameToReturn.Id }, gameToReturn);
        }
        
        [HttpGet("{gameId:guid}", Name = "GetGame")]
        public ActionResult<GameDTO> GetGame(Guid gameId)
        {
            Game gameEntity = this.gameRepository.GetGame(gameId);
            if (gameEntity == null)
                return NotFound();

            GameDTO gameDTO = this.mapper.Map<GameDTO>(gameEntity);

            return Ok(gameDTO);
        }
    }
}
        // private Player GetPlayerFromRequest(ClaimsPrincipal user)
        // {
        //     try
        //     {
        //         var playerName = user.FindFirst(ClaimTypes.Name)?.Value;
        //         var playerId = Guid.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        //         return new Player() { Id = playerId, Name = playerName };
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.Error.WriteLine(ex);
        //         return null;
        //     }
        // }