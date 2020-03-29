
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace code.api.Controllers
{
    [ApiController]
    [Route("api/games")]
    [Authorize]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository gameRepository;
        private readonly IMapper mapper;

        public GameController(IGameRepository gameRepository, IMapper mapper)
        {
            this.gameRepository = gameRepository ?? throw new ArgumentNullException("Game Repository cannot be null");
            this.mapper = mapper ?? throw new ArgumentNullException("Mapper cannot be null");
        }

        [HttpOptions]
        public IActionResult GetGameOptions()
        {
            Response.Headers.Add("Allow", "GET, OPTIONS, POST, HEAD");
            return Ok();
        }

        [HttpGet]
        [HttpHead]
        public ActionResult<IEnumerable<GameDTO>> GetGames()
        {
            var games = this.gameRepository.GetGames();
            return Ok(this.mapper.Map<IEnumerable<GameDTO>>(games));
        }

        [HttpGet("{gameId:guid}", Name = "GetGame")]
        [HttpHead]
        public ActionResult<GameDTO> GetGame(Guid gameId)
        {
            Game gameEntity = this.gameRepository.GetGame(gameId);
            if (gameEntity == null)
                return NotFound();

            GameDTO gameDTO = this.mapper.Map<GameDTO>(gameEntity);

            return Ok(gameDTO);
        }

        [HttpPost]
        public ActionResult<GameDTO> AddGame(GameForCreationDTO gameForCreation)
        {
            var game = this.mapper.Map<Game>(gameForCreation);

            this.gameRepository.AddGame(game);
            this.gameRepository.Save();

            var gameToReturn = this.mapper.Map<GameDTO>(game);

            return CreatedAtRoute("GetGame", new { gameId = gameToReturn.Id }, gameToReturn);
        }

    }
}