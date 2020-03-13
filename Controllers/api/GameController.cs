
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace code.api.Controllers
{
    [ApiController]
    [Route("api/games")]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository gameRepository;
        private readonly IMapper mapper;

        public GameController(IGameRepository gameRepository, IMapper mapper)
        {
            this.gameRepository = gameRepository ?? throw new ArgumentNullException("Game Repository cannot be null");
            this.mapper = mapper ?? throw new ArgumentNullException("Mapper cannot be null");
        }

        [HttpGet]
        [HttpOptions]
        public ActionResult<IEnumerable<GameDTO>> GetGames()
        {
            var games = this.gameRepository.GetGames();
            return Ok(this.mapper.Map<IEnumerable<GameDTO>>(games));
        }

        [HttpPost]
        public ActionResult<GameDTO> AddGame() {
            var game = new Game();
            this.gameRepository.AddGame(game);

            return Ok(this.mapper.Map<GameDTO>(game));            
        }

    }
}