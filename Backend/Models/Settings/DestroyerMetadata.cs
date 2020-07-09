public class DestroyerMetadata : PawnMetadata
{
    public DestroyerMetadata()
    {
        this.PawnType = PawnTypes.DESTROYER;
        this.Name = "Destroyer";
        this.MediaName = "destroyer.svg";
        this.Range = 4;
        this.FleetSize = 4;
        this.Destroys = new [] { PawnTypes.DESTROYER, PawnTypes.SUBMARINE, PawnTypes.ESCORT, PawnTypes.MINESWEEPER, PawnTypes.LANDINGSHIP };
        this.Destroyed = new [] { PawnTypes.DESTROYER, PawnTypes.BATTLESHIP, PawnTypes.MISSILE, PawnTypes.CRUISER, PawnTypes.SUBMARINE, PawnTypes.BATTERY, PawnTypes.MINE };
    }
}