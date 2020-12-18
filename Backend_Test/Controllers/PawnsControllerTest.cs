using System;
using System.Collections.Generic;
using AutoMapper;
using code.api.Controllers;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

public class PawnsControllerTest
{

    Mock<IPawnsRepository> moqPawnsRepository;
    Mock<IGameStateManager> moqGameStateManager;
    Mock<IBattleActionSimulator> moqBattleActionSimulator;
    IMapper autoMapper;

    [SetUp]
    public void SetupTests()
    {
        this.moqPawnsRepository = new Mock<IPawnsRepository>();
        this.autoMapper = new MapperConfiguration(opts =>
        {
            opts.AddProfile(new PawnProfile());
        }).CreateMapper();
        this.moqGameStateManager = new Mock<IGameStateManager>();
        this.moqBattleActionSimulator = new Mock<IBattleActionSimulator>();
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
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        pawnsController = RepositoryTestService.AssignUserToController(pawnsController, playerId.ToString(), "TestPlayer");
        ;
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
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);

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
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
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
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        pawnsController = RepositoryTestService.AssignMockProblemDetailsFactoryToController<PawnsController>(pawnsController);

        var result = pawnsController.AddPawns(Guid.NewGuid(), playerId, pawnsToCreate);

        Assert.IsNotNull(result);
        Assert.That(result.Result, Is.InstanceOf(typeof(NotFoundResult)));
    }
    #endregion

    #region Update Pawn
    [Test]
    [Description("GIVEN PawnsController WHEN UpdatePawn() with wrong data (pawn does not exist) THEN return of NotFound")]
    public void UpdatePawnWithNotFoundTest()
    {
        this.moqPawnsRepository.Setup(m => m.GetPawn(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(() => null);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        JsonPatchDocument<PawnToPatchDTO> patchDocument = new JsonPatchDocument<PawnToPatchDTO>();
        patchDocument.Add(p => p.Col, 100);

        var result = pawnsController.UpdatePawn(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), patchDocument);

        Assert.IsNotNull(result);
        Assert.That(result, Is.InstanceOf(typeof(NotFoundResult)));
    }

    [Test]
    [Description("GIVEN PawnsController WHEN UpdatePawn() with Add operation on Col THEN return status of 404 and Col to have a new value")]
    public void UpdatePawnWithAddOperationTest()
    {
        // [{"op": "add", "path": "row", "value": "6"}]
        int newColValue = 100;
        var pawn = RepositoryTestService.GetPawn(Guid.NewGuid());
        this.moqPawnsRepository.Setup(m => m.GetPawn(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(pawn);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        pawnsController = RepositoryTestService.AssignMockObjectValidatorToController<PawnsController>(pawnsController);
        JsonPatchDocument<PawnToPatchDTO> patchDocument = new JsonPatchDocument<PawnToPatchDTO>();
        patchDocument.Add(p => p.Col, newColValue);

        var result = pawnsController.UpdatePawn(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), patchDocument);

        Assert.IsNotNull(result);
        Assert.That(result, Is.InstanceOf(typeof(ActionResult)));
        Assert.AreEqual(0, pawnsController.ModelState.ErrorCount);
        Assert.AreEqual(newColValue, pawn.Col);
    }

    [Test]
    [Description("GIVEN PawnsController WHEN UpdatePawn() with Remove operation on Col THEN return status of 404 and Col value to be 0")]
    public void UpdatePawnWithRemoveOperationTest()
    {
        // [{"op": "remove", "path": "row"}]
        var pawn = RepositoryTestService.GetPawn(Guid.NewGuid());
        pawn.Col = 100;
        this.moqPawnsRepository.Setup(m => m.GetPawn(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(pawn);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        pawnsController = RepositoryTestService.AssignMockObjectValidatorToController<PawnsController>(pawnsController);
        JsonPatchDocument<PawnToPatchDTO> patchDocument = new JsonPatchDocument<PawnToPatchDTO>();
        patchDocument.Remove(p => p.Col);

        var result = pawnsController.UpdatePawn(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), patchDocument);

        Assert.IsNotNull(result);
        Assert.That(result, Is.InstanceOf(typeof(ActionResult)));
        Assert.AreEqual(0, pawnsController.ModelState.ErrorCount);
        Assert.AreEqual(0, pawn.Col);
    }

    [Test]
    [Description("GIVEN PawnsController WHEN UpdatePawn() with Replace operation on Col THEN return status of 404 and Col value to have a new value")]
    public void UpdatePawnWithReplaceOperationTest()
    {
        // [{"op": "replace", "path": "row", "value": "6"}]
        int newColValue = 100;
        var pawn = RepositoryTestService.GetPawn(Guid.NewGuid());
        this.moqPawnsRepository.Setup(m => m.GetPawn(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(pawn);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        pawnsController = RepositoryTestService.AssignMockObjectValidatorToController<PawnsController>(pawnsController);
        JsonPatchDocument<PawnToPatchDTO> patchDocument = new JsonPatchDocument<PawnToPatchDTO>();
        patchDocument.Replace(p => p.Col, newColValue);

        var result = pawnsController.UpdatePawn(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), patchDocument);

        Assert.IsNotNull(result);
        Assert.That(result, Is.InstanceOf(typeof(ActionResult)));
        Assert.AreEqual(0, pawnsController.ModelState.ErrorCount);
        Assert.AreEqual(newColValue, pawn.Col);
    }

    [Test]
    [Description("GIVEN PawnsController WHEN UpdatePawn() with Move on Col THEN return status of 404 and Col and OldCol values to be upated")]
    public void UpdatePawnWithMoveandAddOperationsTest()
    {
        // [{"op": "move", from: "oldRow", "path": "row"}]
        int colValue = 100;
        var pawn = RepositoryTestService.GetPawn(Guid.NewGuid());
        pawn.Col = colValue;
        this.moqPawnsRepository.Setup(m => m.GetPawn(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(pawn);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        pawnsController = RepositoryTestService.AssignMockObjectValidatorToController<PawnsController>(pawnsController);
        JsonPatchDocument<PawnToPatchDTO> patchDocument = new JsonPatchDocument<PawnToPatchDTO>();
        patchDocument.Move(p => p.Col, p => p.OldCol);

        var result = pawnsController.UpdatePawn(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), patchDocument);

        Assert.IsNotNull(result);
        Assert.That(result, Is.InstanceOf(typeof(ActionResult)));
        Assert.AreEqual(0, pawnsController.ModelState.ErrorCount);
        Assert.AreEqual(colValue, pawn.OldCol);
        Assert.AreEqual(0, pawn.Col);
    }

    [Test]
    [Description("GIVEN PawnsController WHEN UpdatePawn() with Copy operation on Col THEN return status of 404 and Col and OldCol values to be the same")]
    public void UpdatePawnWithCopyOperationsTest()
    {
        // [{"op": "copy", from: "oldRow", "path": "row"}]
        int colValue = 50;
        var pawn = RepositoryTestService.GetPawn(Guid.NewGuid());
        pawn.Col = colValue;
        this.moqPawnsRepository.Setup(m => m.GetPawn(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(pawn);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        pawnsController = RepositoryTestService.AssignMockObjectValidatorToController<PawnsController>(pawnsController);
        JsonPatchDocument<PawnToPatchDTO> patchDocument = new JsonPatchDocument<PawnToPatchDTO>();
        patchDocument.Copy(p => p.Col, p => p.OldCol);

        var result = pawnsController.UpdatePawn(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), patchDocument);

        Assert.IsNotNull(result);
        Assert.That(result, Is.InstanceOf(typeof(ActionResult)));
        Assert.AreEqual(0, pawnsController.ModelState.ErrorCount);
        Assert.AreEqual(colValue, pawn.OldCol);
        Assert.AreEqual(colValue, pawn.Col);
    }

    [Test]
    [Description("GIVEN PawnsController WHEN UpdatePawn() with Test operation on Col THEN return status of 404")]
    public void UpdatePawnWithTestOperationsTest()
    {
        // [{"op": "test", "path": "row", "value": "50"}]
        int colValue = 50;
        var pawn = RepositoryTestService.GetPawn(Guid.NewGuid());
        pawn.Col = colValue;
        this.moqPawnsRepository.Setup(m => m.GetPawn(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(pawn);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper,this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        pawnsController = RepositoryTestService.AssignMockObjectValidatorToController<PawnsController>(pawnsController);
        JsonPatchDocument<PawnToPatchDTO> patchDocument = new JsonPatchDocument<PawnToPatchDTO>();
        patchDocument.Test(p => p.Col, colValue);

        var result = pawnsController.UpdatePawn(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), patchDocument);

        Assert.IsNotNull(result);
        Assert.That(result, Is.InstanceOf(typeof(ActionResult)));
        Assert.AreEqual(0, pawnsController.ModelState.ErrorCount);
    }

    [Test]
    [Description("GIVEN PawnsController WHEN UpdatePawn() with Test operation on Col where data are NOT equal THEN return status ValidationProblem")]
    public void UpdatePawnWithTestOperationsCausingValidationProblemTest()
    {
        // [{"op": "test", "path": "row", "value": "4567"}]
        var pawn = RepositoryTestService.GetPawn(Guid.NewGuid());
        this.moqPawnsRepository.Setup(m => m.GetPawn(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(pawn);
        PawnsController pawnsController = new PawnsController(this.moqPawnsRepository.Object, this.autoMapper, this.moqGameStateManager.Object, this.moqBattleActionSimulator.Object);
        pawnsController = RepositoryTestService.AssignMockObjectValidatorToController<PawnsController>(pawnsController);
        pawnsController = RepositoryTestService.AssignMockProblemDetailsFactoryToController<PawnsController>(pawnsController);
        JsonPatchDocument<PawnToPatchDTO> patchDocument = new JsonPatchDocument<PawnToPatchDTO>();
        patchDocument.Test(p => p.Col, 4567);

        var result = pawnsController.UpdatePawn(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), patchDocument);

        Assert.IsNotNull(result);
        Assert.That(result, Is.InstanceOf(typeof(ObjectResult)));
        Assert.That((result as ObjectResult).Value, Is.InstanceOf(typeof(ValidationProblemDetails)));
        Assert.AreEqual(1, pawnsController.ModelState.ErrorCount);
    }
    #endregion
}