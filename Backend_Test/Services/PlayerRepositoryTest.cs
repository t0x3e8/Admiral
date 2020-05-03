using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;

public class PlayerRepositoryTest
{
    private Mock<AdmiralDbContext> moqDbContext;

    public PlayerRepositoryTest()
    {

    }

    [SetUp]
    public void SetupDbContext()
    {
        var players = DatabaseTestService.GetTestPlayersList();
        this.moqDbContext = new Mock<AdmiralDbContext>();
    }

    [Test]
    public void GenerateTokenForNewPlayer()
    {
        IPlayersRepository playersRepository = new PlayersRepository(this.moqDbContext.Object);
        var testPlayer = new Player() { Id = Guid.NewGuid(), Name = "TestName" };
        var testKey = "The secret must be long";

        string token = playersRepository.GenerateToken(testPlayer, testKey);

        Assert.IsNotNull(token);
        Assert.IsNotEmpty(token);
    }
}