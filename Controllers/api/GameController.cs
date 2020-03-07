
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace code.api.Controllers
{
    [ApiController]
    [Route("api/games")]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository gameRepository;

        public GameController(IGameRepository gameRepository)
        {
            this.gameRepository = gameRepository;
        }

        [HttpGet]
        [HttpOptions]
        public ActionResult<IEnumerable<Game>> GetGames()
        {
            var games = this.gameRepository.GetGames();
            return Ok(games);
        }

        [HttpPost]
        public ActionResult<Game> AddGame() {
            var game = new Game();
            this.gameRepository.AddGame(game);

            return Ok(game);            
        }

    }
}