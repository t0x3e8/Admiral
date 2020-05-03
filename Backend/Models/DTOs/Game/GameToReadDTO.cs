using System;
using System.Collections.Generic;

public abstract class GameToReadDTO {
    
    public List<PlayerDTO> Players { get; private set; }
    public int GameStatus { get; private set; } 
    public int GameDuration { get; private set; }
    public Guid Id { get; private set; }
    public string Name { get; private set; }
}