using System;
using System.Text;
using Moq;
using NUnit.Framework;

public class PlayerRepositoryTest
{
    public PlayerRepositoryTest()
    {

    }

    [Test]
    public void GenerateTokenForNewPlayer()
    {
        var moqDbContext = new Mock<AdmiralDbContext>();
        IPlayersRepository playersRepository = new PlayersRepository(moqDbContext.Object);
        var testPlayer = new Player() { Id = Guid.NewGuid(), Name = "TestName" };
        var testKey = "The secret must be long";

        string token = playersRepository.GenerateToken(testPlayer, testKey);

        Assert.IsNotNull(token);
        Assert.IsNotEmpty(token);
    }
}