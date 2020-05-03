using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Moq;

public static class DatabaseTestService
{
    internal static Mock<DbSet<T>> GetMockDbSet<T>(ICollection<T> entities) where T : class
    {
        var queryable = entities.AsQueryable();

        var dbSet = new Mock<DbSet<T>>();
        dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
        dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
        dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
        dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
        dbSet.Setup(d => d.Add(It.IsAny<T>())).Callback<T>((s) => entities.Add(s));

        return dbSet;
    }

    internal static IList<Player> GetTestPlayersList()
    {
        return new List<Player>() {
            new Player()
            {
                Name = "Roman",
                Id = Guid.Parse("b80c661d-8ea9-4b10-a490-ce4625db3cc9")
            }, new Player()
            {
                Name = "Wojtek",
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111")
            }
        };
    }

}