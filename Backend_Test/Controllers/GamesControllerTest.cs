using code.api.Controllers;
using Moq;
using NUnit.Framework;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;

public class GamesControllerTest
{
  Mock<IGamesRepository> moqGamesRepository;
  IMapper autoMapper;

  public GamesControllerTest()
  {

  }

  [SetUp]
  public void SetupTests()
  {
    this.moqGamesRepository = new Mock<IGamesRepository>();
    this.autoMapper = new MapperConfiguration(opts =>
    {
      opts.AddProfile(new GameProfile());
      opts.AddProfile(new PlayerProfile());
    }).CreateMapper();
  }

  #region Get Games
  [Test]
  [Description("GIVEN GameController WHEN GetGames() THEN returns collection of Game-s and StatusCode 200")]
  public void GetGamesTest()
  {
    var gamesReturnedByRepository = RepositoryTestService.GetGames();
    this.moqGamesRepository.Setup(m => m.GetGames()).Returns(gamesReturnedByRepository);
    GamesController gameController = new GamesController(this.moqGamesRepository.Object, this.autoMapper);
    var result = gameController.GetGames();

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(OkObjectResult)));
    OkObjectResult okObjectResult = result.Result as OkObjectResult;
    Assert.AreEqual(okObjectResult.StatusCode, 200);
    Assert.Greater((okObjectResult.Value as IList<GameDTO>).Count, 0);
  }
  #endregion

  #region Add Game
  [Test]
  [Description("GIVEN GameController WHEN AddGame() with correct THEN returns of new GameDTO and StatusCode 201")]
  public void AddGameTest()
  {
    var game = RepositoryTestService.GetGame(Guid.NewGuid());
    var gameToCreate = this.autoMapper.Map<GameToCreateDTO>(game);
    this.moqGamesRepository.Setup(m => m.AddGame(It.IsAny<Game>())).Returns(game);
    this.moqGamesRepository.Setup(m => m.Save()).Returns(1);
    GamesController gameController = new GamesController(this.moqGamesRepository.Object, this.autoMapper);

    var result = gameController.AddGame(gameToCreate);

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(CreatedAtRouteResult)));
    CreatedAtRouteResult createdAtRouteResult = result.Result as CreatedAtRouteResult;
    Assert.AreEqual(createdAtRouteResult.RouteName, "GetGame");
    Assert.AreEqual(createdAtRouteResult.StatusCode, 201);
    Assert.That((createdAtRouteResult.Value as GameDTO).Id, Is.InstanceOf(typeof(Guid)));
  }

  [Test]
  [Description("GIVEN GameController WHEN AddGame() with database error THEN returns ProblemDetails")]
  public void AddGameWithDatabaseExceptionTest()
  {
    var game = RepositoryTestService.GetGame(Guid.NewGuid());
    var gameToCreate = this.autoMapper.Map<GameToCreateDTO>(game);
    this.moqGamesRepository.Setup(m => m.AddGame(It.IsAny<Game>())).Throws(new Exception());
    GamesController gameController = new GamesController(this.moqGamesRepository.Object, this.autoMapper);
    gameController = RepositoryTestService.AssignMockProblemDetailsFactoryToController<GamesController>(gameController);

    var result = gameController.AddGame(gameToCreate);

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(ObjectResult)));
    ObjectResult problemResult = result.Result as ObjectResult;
    Assert.That(problemResult.Value, Is.InstanceOf(typeof(ProblemDetails)));
  }
  #endregion

  #region Get Game
  [Test]
  [Description("GIVEN GameController WHEN GetGame() with existing gameId THEN returns GameDTO and StatusCode 200")]
  public void GetGameByGuidTest()
  {
    var player = new Player() { Name = "TestPlayer", Id = Guid.NewGuid() };
    var gameId = Guid.NewGuid();
    var game = RepositoryTestService.GetGame(gameId, new Player[] { player });
    this.moqGamesRepository.Setup(m => m.GetGame(It.IsAny<Guid>())).Returns(game);
    GamesController gameController = new GamesController(this.moqGamesRepository.Object, this.autoMapper);

    var result = gameController.GetGame(gameId);

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(OkObjectResult)));
    OkObjectResult okObjectResult = result.Result as OkObjectResult;
    Assert.AreEqual(okObjectResult.StatusCode, 200);
    Assert.That(okObjectResult.Value, Is.InstanceOf(typeof(GameDTO)));
    Assert.AreEqual((okObjectResult.Value as GameDTO).Id, gameId);
  }

  [Test]
  [Description("GIVEN GameController WHEN GetGame() with NOT existing gameId THEN StatusCode 404")]
  public void GetGameByInvalidGameIdTest()
  {
    var player = new Player() { Name = "TestPlayer", Id = Guid.NewGuid() };
    var gameId = Guid.NewGuid();
    this.moqGamesRepository.Setup(m => m.GetGame(It.IsAny<Guid>())).Returns(() => null);
    GamesController gameController = new GamesController(this.moqGamesRepository.Object, this.autoMapper);

    var result = gameController.GetGame(gameId);

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(NotFoundResult)));
    NotFoundResult notFoundResult = result.Result as NotFoundResult;
    Assert.AreEqual(notFoundResult.StatusCode, 404);
  }
  #endregion
}