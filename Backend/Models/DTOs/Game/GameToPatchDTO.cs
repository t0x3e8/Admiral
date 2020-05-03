using System.Collections.Generic;

public class GameToPatchDTO : GameToWriteDTO<PawnToPatchDTO> {
    public GameToPatchDTO()
    {
        this.Pawns = new List<PawnToPatchDTO>();
    }
}