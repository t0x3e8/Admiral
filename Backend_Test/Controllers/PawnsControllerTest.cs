using System;
using System.Collections.Generic;
using AutoMapper;
using code.api.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

public class PawnsControllerTest {
    
    Mock<IPawnsRepository> moqPawnsRepository;
    IMapper autoMapper;
    
    [SetUp]
    public void SetupTests()
    {
        this.moqPawnsRepository = new Mock<IPawnsRepository>();
        this.autoMapper = new MapperConfiguration(opts =>
        {
            opts.AddProfile(new PawnProfile());
        }).CreateMapper();
    }

    #region Get Pawns
    [Test]
    [Description("GIVEN PawnsController WHEN GetPawns() for a specific game and player THEN returns collection of Pawn-s and StatusCode 200")]
    public void GetPawnsTest()
    {
        var playerId = Guid.NewGuid();
        var gameId = Guid.NewGuid();
        var pawns = RepositoryTestService.GetPawns(playerId, 10);
        this.moqPawnsRepository.Setup(m => m.GetPawns(gameId, playerId)).Returns(pawns);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper);
        var result = pawnsController.GetPawns(gameId, playerId);

        Assert.IsNotNull(result);
        Assert.That(result.Result, Is.InstanceOf(typeof(OkObjectResult)));
        OkObjectResult okObjectResult = result.Result as OkObjectResult;
        Assert.AreEqual(okObjectResult.StatusCode, 200);
        Assert.AreEqual((okObjectResult.Value as IList<PawnDTO>).Count, 10);
    }
    #endregion
    
    #region Add Pawn
    [Test]
    [Description("GIVEN PawnsController WHEN AddPawns() with correct data THEN returns of collection of PawnDTO and StatusCode 201")]
    public void AddPawnsTest()
    {
        var playerId = Guid.NewGuid();
        IEnumerable<Pawn> pawns = RepositoryTestService.GetPawns(playerId, 5);
        var pawnsToCreate = this.autoMapper.Map<IEnumerable<PawnToCreateDTO>>(pawns);
        this.moqPawnsRepository.Setup(m => m.AddPawns(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<IEnumerable<Pawn>>())).Returns(pawns);
        this.moqPawnsRepository.Setup(m => m.Save()).Returns(1);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper);

        var result = pawnsController.AddPawns(Guid.NewGuid(), playerId, pawnsToCreate);

        Assert.IsNotNull(result);
        Assert.That(result.Result, Is.InstanceOf(typeof(CreatedAtRouteResult)));
        CreatedAtRouteResult createdAtRouteResult = result.Result as CreatedAtRouteResult;
        Assert.AreEqual(createdAtRouteResult.RouteName, "GetPawns");
        Assert.AreEqual(createdAtRouteResult.StatusCode, 201);
        Assert.That(createdAtRouteResult.Value, Is.InstanceOf(typeof(IEnumerable<PawnDTO>)));
    }

    [Test]
    [Description("GIVEN PawnsController WHEN AddPawns() with database error THEN returns ProblemDetails")]
    public void AddPawnsWithDatabaseProblemTest()
    {
        var playerId = Guid.NewGuid();
        IEnumerable<Pawn> pawns = RepositoryTestService.GetPawns(playerId, 5);
        var pawnsToCreate = this.autoMapper.Map<IEnumerable<PawnToCreateDTO>>(pawns);
        this.moqPawnsRepository.Setup(m => m.AddPawns(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<IEnumerable<Pawn>>())).Throws(new Exception());
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper);
        pawnsController = RepositoryTestService.AssignMockProblemDetailsFactoryToController<PawnsController>(pawnsController);

        var result = pawnsController.AddPawns(Guid.NewGuid(), playerId, pawnsToCreate);

        Assert.IsNotNull(result);
        Assert.That(result.Result, Is.InstanceOf(typeof(ObjectResult)));
        ObjectResult problemResult = result.Result as ObjectResult;
        Assert.That(problemResult.Value, Is.InstanceOf(typeof(ProblemDetails)));
    }

    [Test]
    [Description("GIVEN PawnsController WHEN AddPawns() with gameId or playerId problem THEN returns 404")]
    public void AddPawnsWithGameIdOrPlayerIdProblemTest()
    {
        var playerId = Guid.NewGuid();
        IEnumerable<Pawn> pawns = RepositoryTestService.GetPawns(playerId, 5);
        var pawnsToCreate = this.autoMapper.Map<IEnumerable<PawnToCreateDTO>>(pawns);
        this.moqPawnsRepository.Setup(m => m.AddPawns(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<IEnumerable<Pawn>>())).Returns(() => null);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper);
        pawnsController = RepositoryTestService.AssignMockProblemDetailsFactoryToController<PawnsController>(pawnsController);

        var result = pawnsController.AddPawns(Guid.NewGuid(), playerId, pawnsToCreate);

        Assert.IsNotNull(result);
        Assert.That(result.Result, Is.InstanceOf(typeof(NotFoundResult)));
    }
    #endregion
}