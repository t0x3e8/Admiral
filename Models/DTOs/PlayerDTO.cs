using System;
using System.Collections.Generic;

public class PlayerDTO {
    public string Name { get; private set; }
    public Guid Id { get; private set; }
    public IEnumerable<Pawn> Pawns {get; private set;}
}