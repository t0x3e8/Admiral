public class EscortMetadata : PawnMetadata
{
    public EscortMetadata()
    {
        this.PawnType = PawnTypes.ESCORT;
        this.Name = "Escort";
        this.MediaName = "escort.svg";
        this.Range = 3;
        this.FleetSize = 4;
        this.Destroys = new[] { PawnTypes.ESCORT, PawnTypes.SUBMARINE, PawnTypes.MINESWEEPER, PawnTypes.LANDINGSHIP };
        this.Destroyed = new[] { PawnTypes.ESCORT, PawnTypes.BATTLESHIP, PawnTypes.MISSILE, PawnTypes.CRUISER, PawnTypes.DESTROYER, PawnTypes.BATTERY, PawnTypes.MINE };
    }
}