using System;
using System.Collections.Generic;
using AutoMapper;
using code.api.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

public class PlayersControllerTest
{

  Mock<IPlayersRepository> moqPlayersRepository;
  IMapper autoMapper;

  [SetUp]
  public void SetupTests()
  {
    this.moqPlayersRepository = new Mock<IPlayersRepository>();
    this.autoMapper = new MapperConfiguration(opts =>
    {
      opts.AddProfile(new PlayerProfile());
    }).CreateMapper();
  }

  #region Get Players
  [Test]
  [Description("GIVEN PlayersController WHEN GetPlayers() for a specific game THEN returns collection of Player-s and StatusCode 200")]
  public void GetPlayersTest()
  {
    var player1 = RepositoryTestService.GetRandomPlayer("Player 1");
    var player2 = RepositoryTestService.GetRandomPlayer("Player 2");
    this.moqPlayersRepository.Setup(m => m.GetPlayers(It.IsAny<Guid>())).Returns(new Player[] { player1, player2 });
    PlayersController playersController = new PlayersController(this.moqPlayersRepository.Object, this.autoMapper, null);
    var result = playersController.GetPlayers(Guid.NewGuid());

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(OkObjectResult)));
    OkObjectResult okObjectResult = result.Result as OkObjectResult;
    Assert.AreEqual(okObjectResult.StatusCode, 200);
    Assert.AreEqual((okObjectResult.Value as IList<PlayerDTO>).Count, 2);
  }
  #endregion

  #region Add Player
  [Test]
  [Description("GIVEN PlayersController WHEN AddPlayer() with correct THEN returns of new PlayerDTO and StatusCode 201")]
  public void AddPlayerTest()
  {
    var player = RepositoryTestService.GetRandomPlayer("Test Player");
    var playerToCreate = this.autoMapper.Map<PlayerToCreateDTO>(player);
    this.moqPlayersRepository.Setup(m => m.AddPlayer(It.IsAny<Guid>(), It.IsAny<Player>())).Returns(player);
    this.moqPlayersRepository.Setup(m => m.Save()).Returns(1);
    PlayersController playersController = new PlayersController(this.moqPlayersRepository.Object, this.autoMapper, null);

    var result = playersController.AddPlayer(Guid.NewGuid(), playerToCreate);

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(CreatedAtRouteResult)));
    CreatedAtRouteResult createdAtRouteResult = result.Result as CreatedAtRouteResult;
    Assert.AreEqual(createdAtRouteResult.RouteName, "GetPlayer");
    Assert.AreEqual(createdAtRouteResult.StatusCode, 201);
    Assert.That((createdAtRouteResult.Value as PlayerDTO).Id, Is.InstanceOf(typeof(Guid)));
  }

  [Test]
  [Description("GIVEN PlayersController WHEN AddPlayer() with Database error THEN returns ProblemDetails")]
  public void AddPlayerWithDatabaseProblemTest()
  {
    var player = RepositoryTestService.GetRandomPlayer("Test Player");
    var playerToCreate = this.autoMapper.Map<PlayerToCreateDTO>(player);
    this.moqPlayersRepository.Setup(m => m.AddPlayer(It.IsAny<Guid>(), It.IsAny<Player>())).Throws(new Exception());
    PlayersController playersController = new PlayersController(this.moqPlayersRepository.Object, this.autoMapper, null);
    playersController = RepositoryTestService.AssignMockProblemDetailsFactoryToController<PlayersController>(playersController);

    var result = playersController.AddPlayer(Guid.NewGuid(), playerToCreate);

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(ObjectResult)));
    ObjectResult problemResult = result.Result as ObjectResult;
    Assert.That(problemResult.Value, Is.InstanceOf(typeof(ProblemDetails)));
  }

  [Test]
  [Description("GIVEN PlayersController WHEN AddPlayer() with GameId problem THEN returns ProblemDetails")]
  public void AddPlayerWithWrongGameIdTest()
  {
    var player = RepositoryTestService.GetRandomPlayer("Test Player");
    var playerToCreate = this.autoMapper.Map<PlayerToCreateDTO>(player);
    this.moqPlayersRepository.Setup(m => m.AddPlayer(It.IsAny<Guid>(), It.IsAny<Player>())).Returns(() => null);
    PlayersController playersController = new PlayersController(this.moqPlayersRepository.Object, this.autoMapper, null);
    playersController = RepositoryTestService.AssignMockProblemDetailsFactoryToController<PlayersController>(playersController);

    var result = playersController.AddPlayer(Guid.NewGuid(), playerToCreate);

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(NotFoundResult)));
  }
  #endregion

  #region Get Player
  [Test]
  [Description("GIVEN PlayerController WHEN GetPlayer() with gameId & playerId THEN returns PlayerDTO and StatusCode 200")]
  public void GetPlayerTest()
  {
    var player = new Player() { Name = "TestPlayer", Id = Guid.NewGuid() };
    var gameId = Guid.NewGuid();
    this.moqPlayersRepository.Setup(m => m.GetPlayer(It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(player);
    PlayersController playersController = new PlayersController(this.moqPlayersRepository.Object, this.autoMapper, null);

    var result = playersController.GetPlayer(gameId, player.Id);

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(OkObjectResult)));
    OkObjectResult okObjectResult = result.Result as OkObjectResult;
    Assert.AreEqual(okObjectResult.StatusCode, 200);
    Assert.That(okObjectResult.Value, Is.InstanceOf(typeof(PlayerDTO)));
    Assert.AreEqual((okObjectResult.Value as PlayerDTO).Id, player.Id);
  }

  [Test]
  [Description("GIVEN PlayerController WHEN GetPlayer() with Not exsiting gameId THEN StatusCode 404")]
  public void GetPlayerWithInvalidGameIdTest()
  {
    var playerId = Guid.NewGuid();
    var gameId = Guid.NewGuid();
    this.moqPlayersRepository.Setup(m => m.GetPlayer(It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(() => null);
    PlayersController playersController = new PlayersController(this.moqPlayersRepository.Object, this.autoMapper, null);

    var result = playersController.GetPlayer(gameId, playerId);

    Assert.IsNotNull(result);
    Assert.That(result.Result, Is.InstanceOf(typeof(NotFoundResult)));
    NotFoundResult notFoundResult = result.Result as NotFoundResult;
    Assert.AreEqual(notFoundResult.StatusCode, 404);
  }
  #endregion
}