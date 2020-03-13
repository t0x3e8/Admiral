using System.Collections.Generic;

public class GameDTO {
    public List<PlayerDTO> Players { get; private set; }
    public int GameStatus { get; private set; } 
    public int GameDuration { get; private set; }
}