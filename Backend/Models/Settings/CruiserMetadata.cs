public class CruiserMetadata : PawnMetadata
{
    public CruiserMetadata()
    {
        this.PawnType = PawnTypes.CRUISER;
        this.Name = "Cruiser";
        this.MediaName = "cruiser.svg";
        this.Range = 2;
        this.FleetSize = 3;
        this.Destroys = new[] { PawnTypes.CRUISER, PawnTypes.DESTROYER, PawnTypes.ESCORT, PawnTypes.MINESWEEPER, PawnTypes.LANDINGSHIP };
        this.Destroyed = new[] { PawnTypes.CRUISER, PawnTypes.BATTLESHIP, PawnTypes.MISSILE, PawnTypes.SUBMARINE, PawnTypes.BATTERY, PawnTypes.MINE };
    }
}