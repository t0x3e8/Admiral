
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
    public class GameController : ControllerBase
    {
        private readonly IGameRepository gameRepository;
        private readonly IPlayersRepository playerRepository;
        private readonly IMapper mapper;

        public GameController(IGameRepository gameRepository, IPlayersRepository playerRepository, IMapper mapper)
        {
            this.gameRepository = gameRepository ?? throw new ArgumentNullException("Game Repository cannot be null");
            this.playerRepository = playerRepository ?? throw new ArgumentNullException("Player Repository cannot be null");
            this.mapper = mapper ?? throw new ArgumentNullException("Mapper cannot be null");
        }

        [HttpOptions]
        public IActionResult GetGameOptions()
        {
            Response.Headers.Add("Allow", "GET, OPTIONS, POST, PATCH");
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<GameDTO>> GetGames()
        {
            var games = this.gameRepository.GetGames();
            return Ok(this.mapper.Map<IEnumerable<GameDTO>>(games));
        }

        [HttpGet("{gameId:guid}", Name = "GetGame")]
        public ActionResult<GameDTO> GetGame(Guid gameId)
        {
            var playerFromRequest = this.GetPlayerFromRequest(this.User);

            Game gameEntity = this.gameRepository.GetGame(gameId, playerFromRequest?.Id ?? Guid.Empty);
            if (gameEntity == null)
                return NotFound();

            GameDTO gameDTO = this.mapper.Map<GameDTO>(gameEntity);

            return Ok(gameDTO);
        }

        [HttpPost]
        public ActionResult<GameDTO> AddGame(GameToCreateDTO gameToCreate)
        {
            if (gameToCreate.Players.Count != 1)
            {
                ModelState.AddModelError("Players", "Exactly one player must be specified");
                return ValidationProblem();
            }

            var playerFromRequest = this.GetPlayerFromRequest(this.User);

            if (playerRepository == null || 
                gameToCreate.Players[0].Id != playerFromRequest.Id || 
                gameToCreate.Players[0].Name != playerFromRequest.Name)
            {
                ModelState.AddModelError("Players", "Player is not authorized to create a game");
                return ValidationProblem();
            }

            try
            {
                var player = this.mapper.Map<Player>(gameToCreate.Players[0]);
                var playerEntity = this.playerRepository.AddPlayer(player);
            }
            catch
            {
                return Problem($"Error while adding player");
            }

            var game = new Game();
            try
            {
                this.mapper.Map(gameToCreate, game);
                this.gameRepository.AddGame(game);
            }
            catch
            {
                return Problem($"Error while adding game");
            }

            this.gameRepository.Save();
            var gameToReturn = this.mapper.Map<GameDTO>(game);

            return CreatedAtRoute("GetGame", new { gameId = gameToReturn.Id }, gameToReturn);
        }


        [HttpPatch("{gameId:guid}")]
        public ActionResult PartiallyUpdateGame(Guid gameId, JsonPatchDocument<GameToPatchDTO> patchDocument)
        {
            if (patchDocument == null)
                return BadRequest();

            var playerFromRequest = this.GetPlayerFromRequest(this.User);
            if (playerFromRequest == null)
            {
                return BadRequest("Token is invalid");
            }
    



            return NoContent();

            // bool doesPlayerExist = playerRepository.PlayerExist(playerFromRequest);
            // if (!doesPlayerExist) {
            //     this.playerRepository.AddPlayer(playerFromRequest);
            // }

            // Game gameEntity = this.gameRepository.GetGame(gameId, playerFromRequest.Id);
            // if (gameEntity == null) {
            //     return NotFound($"No Game with id: {gameId}");
            // }
        
            // bool hasPlayerAlreadyJoined = (gameEntity.Players.Find(gp => gp.PlayerId == playerFromRequest.Id) != null);
            // bool canPlayerJoin = gameEntity.Players.Count < 2;
            // if (!canPlayerJoin && !hasPlayerAlreadyJoined) {                 
            //     return Unauthorized("Player cannot join the game");
            // }

            // if (!hasPlayerAlreadyJoined) {
            //     // this.gameRepository.AddPlayerToGame(gameEntity.Id, playerFromRequest.Id);
            //     gameEntity.Players.Add(new GamePlayer() { PlayerId = playerFromRequest.Id, GameId = gameEntity.Id});
            // }

            // GameToPatchDTO gameToPatch = this.mapper.Map<GameToPatchDTO>(gameEntity);

            // patchDocument.ApplyTo(gameToPatch, ModelState);

            // foreach(var pawn in gameToPatch.Pawns) {
            //     if (pawn.Id == Guid.Empty) {
            //         pawn.PlayerId = playerFromRequest.Id;
            //         pawn.GameId = gameEntity.Id;
            //     }
            // }

            // if (!TryValidateModel(gameToPatch))
            //     return ValidationProblem(ModelState);
            // // this.gameRepository.UpdateGame(gameEntity, playerFromRequest, this.mapper.Map<Pawn[]>(gameToPatch.Pawns));
            // this.mapper.Map(gameToPatch, gameEntity);
            // this.gameRepository.Save();

        }

        private Player GetPlayerFromRequest(ClaimsPrincipal user)
        {
            try
            {
                var playerName = user.FindFirst(ClaimTypes.Name)?.Value;
                var playerId = Guid.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                return new Player() { Id = playerId, Name = playerName };
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return null;
            }
        }
    }
}