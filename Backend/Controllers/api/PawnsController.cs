using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace code.api.Controllers
{
    [ApiController]
    [Authorize]
    public class PawnsController : ControllerBase
    {
        private readonly IPawnsRepository pawnsRepository;
        private readonly IMapper mapper;

        public PawnsController(IPawnsRepository pawnsRepository, IMapper mapper)
        {
            this.pawnsRepository = pawnsRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("api/games/{gameid}/players/{playerId}/pawns", Name="GetPawns")]
        public ActionResult<IEnumerable<PawnDTO>> GetPawns(Guid gameId, Guid playerId)
        {
            var pawns = this.pawnsRepository.GetPawns(gameId, playerId);
            return Ok(this.mapper.Map<IEnumerable<PawnDTO>>(pawns));
        }

        [HttpPost]
        [Route("api/games/{gameid}/players/{playerId}/pawns")]
        public ActionResult<IEnumerable<PawnDTO>> AddPawns(Guid gameId, Guid playerId, IEnumerable<PawnToCreateDTO> pawnsToCreate)
        {
            var pawns = this.mapper.Map<IEnumerable<Pawn>>(pawnsToCreate);
            try
            {
                pawns = this.pawnsRepository.AddPawns(gameId, playerId, pawns);
                if(pawns == null)
                    return NotFound();

                this.pawnsRepository.Save();
            }
            catch
            {
                return Problem("Error while creating the resource");
            }

            var pawnsToReturn = this.mapper.Map<IEnumerable<PawnDTO>>(pawns);

            return CreatedAtRoute("GetPawns", new { gameId, playerId }, pawnsToReturn);
        }
   
        [HttpPatch]
        [Route("api/games/{gameid}/players/{playerid}/pawns/{pawnid}")]
        public ActionResult UpdatePawn(Guid gameId, Guid playerId, Guid pawnid, JsonPatchDocument<PawnToPatchDTO> patchDocument) {
            var pawn = this.pawnsRepository.GetPawn(gameId, playerId, pawnid);

            if (pawn == null) 
                return NotFound();

            var pawnToPatch = this.mapper.Map<PawnToPatchDTO>(pawn);
            patchDocument.ApplyTo(pawnToPatch, ModelState);

            if (!this.TryValidateModel(pawnToPatch))
                return ValidationProblem(ModelState);

            this.mapper.Map(pawnToPatch, pawn);
            this.pawnsRepository.Save();

            return NoContent();
        }
    }
}