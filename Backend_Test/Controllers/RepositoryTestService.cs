using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using AutoMapper;
using Moq;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.JsonPatch;

internal static class RepositoryTestService
{
    internal static IEnumerable<Game> GetGames()
    {
        var player1 = RepositoryTestService.GetRandomPlayer("Player1");
        var pawns1 = RepositoryTestService.GetPawns(player1.Id, 1);
        var game1 = RepositoryTestService.GetGame(Guid.NewGuid(), new Player[] { player1 }, pawns1);

        var player2 = RepositoryTestService.GetRandomPlayer("Player2");
        var pawns2 = RepositoryTestService.GetPawns(player2.Id, 2);
        var game2 = RepositoryTestService.GetGame(Guid.NewGuid(), new Player[] { player2 }, pawns2);

        var player3 = RepositoryTestService.GetRandomPlayer("Player3");
        var pawns3 = RepositoryTestService.GetPawns(player3.Id, 3);
        var game3 = RepositoryTestService.GetGame(Guid.NewGuid(), new Player[] { player3 }, pawns3);


        var games = new List<Game>();
        games.Add(game1);
        games.Add(game2);
        games.Add(game3);

        return games;
    }

    internal static IList<Pawn> GetPawns(Guid playerId, int numberOfPawns)
    {
        IList<Pawn> pawns = new List<Pawn>();

        for (int i = 0; i < numberOfPawns; i++)
        {
            Pawn pawn = new Pawn();
            pawn.Col = i;
            pawn.Row = i;
            pawn.OldCol = i + 1;
            pawn.OldRow = i + 1;
            pawn.Type = 4;
            pawn.Id = Guid.NewGuid();
            pawn.PlayerId = playerId;

            pawns.Add(pawn);
        }

        return pawns;
    }

    internal static Player GetRandomPlayer(string name)
    {
        return new Player() { Id = Guid.NewGuid(), Name = name };
    }

    internal static Game GetGame(Guid gameId)
    {
        Game game = new Game()
        {
            Id = gameId,
            Created = DateTime.Now,
            Name = "Test game",
            Status = 0,
            Players = new List<GamePlayer>(),
            Pawns = new List<Pawn>()
        };

        return game;
    }

    internal static Game GetGame(Guid gameId, IList<Player> players)
    {
        var game = RepositoryTestService.GetGame(gameId);
        foreach (var player in players)
            game.Players.Add(new GamePlayer() { GameId = gameId, Player = player, PlayerId = player.Id });

        return game;
    }

    internal static Game GetGame(Guid gameId, IList<Player> players, IList<Pawn> pawns)
    {
        var game = RepositoryTestService.GetGame(gameId, players);
        foreach (var pawn in pawns)
        {
            pawn.GameId = game.Id;
            game.Pawns.Add(pawn);
        }

        return game;
    }

    internal static T AssignMockProblemDetailsFactoryToController<T>(T controller) where T : ControllerBase
    {
        var moqProblemDetailsFactory = new Mock<ProblemDetailsFactory>();
        moqProblemDetailsFactory.Setup(m => m.CreateProblemDetails(
                                                It.IsAny<HttpContext>(),
                                                It.IsAny<int?>(),
                                                It.IsAny<string>(),
                                                It.IsAny<string>(),
                                                It.IsAny<string>(),
                                                It.IsAny<string>()))
                                .Returns(new ProblemDetails());

        moqProblemDetailsFactory.Setup(m => m.CreateValidationProblemDetails(
                                                It.IsAny<HttpContext>(),
                                                controller.ModelState,
                                                It.IsAny<int?>(),
                                                It.IsAny<string>(),
                                                It.IsAny<string>(),
                                                It.IsAny<string>(),
                                                It.IsAny<string>()))
                                .Returns(new ValidationProblemDetails(controller.ModelState));

        controller.ProblemDetailsFactory = moqProblemDetailsFactory.Object;

        return controller;
    }
}



// internal static GameToCreateDTO GetGameToCreate(Game game)
// {
//     var gameToCreateDTO = new GameToCreateDTO();
//     gameToCreateDTO.Name = game.Name;
//     gameToCreateDTO.Pawns = new List<PawnToCreateDTO>();
//     game.Pawns.ForEach(p => gameToCreateDTO.Pawns.Add(new PawnToCreateDTO()
//     {
//         Col = p.Col,
//         Row = p.Row,
//         OldCol = p.OldCol,
//         OldRow = p.OldRow,
//         Type = p.Type
//     }));
//     gameToCreateDTO.Players = new List<PlayerToCreateDTO>();
//     game.Players.ForEach(p => gameToCreateDTO.Players.Add(new PlayerToCreateDTO()
//     {
//         Id = p.PlayerId,
//         Name = p.Player?.Name
//     }));

//     return gameToCreateDTO;
// }

// internal static T AssignUserToController<T>(T controller, Player player) where T : ControllerBase
// {
//     var claims = new[] {
//         new Claim(ClaimTypes.Name, player.Name),
//         new Claim(ClaimTypes.NameIdentifier, player.Id.ToString())
//     };

//     var identity = new ClaimsIdentity(claims, "TestAuthType");
//     var claimsPrincipal = new ClaimsPrincipal(identity);

//     controller.ControllerContext = new ControllerContext()
//     {
//         HttpContext = new DefaultHttpContext() { User = claimsPrincipal }
//     };

//     return controller;
// }

// internal static T AssignMockObjectValidatorToController<T>(T controller) where T : ControllerBase
// {
//     var moqObjectValidator = new Mock<IObjectModelValidator>();
//     moqObjectValidator.Setup(m => m.Validate(It.IsAny<ActionContext>(),
//                                             It.IsAny<ValidationStateDictionary>(),
//                                             It.IsAny<string>(),
//                                             It.IsAny<object>()));

//     controller.ObjectValidator = moqObjectValidator.Object;

//     return controller;
// }



// internal static JsonPatchDocument<GameToPatchDTO> GetPatchDocumentWithAddPawn()
// {
//     var patchDocument = new JsonPatchDocument<GameToPatchDTO>();
//     var pawnToPatch = new PawnToPatchDTO()
//     {
//         Col = 1,
//         Row = 3,
//         Type = 5
//     };
//     patchDocument.Add(p => p.Pawns, pawnToPatch);

//     return patchDocument;
// }

// internal static JsonPatchDocument<GameToPatchDTO> GetPatchDocumentWithRemovePawn()
// {
//     var patchDocument = new JsonPatchDocument<GameToPatchDTO>();
//     patchDocument.Remove(p => p.Pawns);

//     return patchDocument;
// }