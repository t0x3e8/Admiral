public class SubmarineMetadata : PawnMetadata
{
    public SubmarineMetadata()
    {
        this.PawnType = PawnTypes.SUBMARINE;
        this.Name = "Submarine";
        this.MediaName = "submarine.svg";
        this.Range = 2;
        this.FleetSize = 4;
        this.Destroys = new [] { PawnTypes.SUBMARINE, PawnTypes.BATTLESHIP, PawnTypes.MISSILE, PawnTypes.CRUISER, PawnTypes.DESTROYER, PawnTypes.MINESWEEPER, PawnTypes.LANDINGSHIP };
        this.Destroyed = new [] { PawnTypes.SUBMARINE, PawnTypes.ESCORT, PawnTypes.DESTROYER, PawnTypes.BATTERY, PawnTypes.MINE };
    }
}