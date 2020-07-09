public class LandingShipMetadata : PawnMetadata
{
    public LandingShipMetadata()
    {
        this.PawnType = PawnTypes.LANDINGSHIP;
        this.Name = "Landing Ship";
        this.MediaName = "landingship.svg";
        this.Range = 2;
        this.FleetSize = 1;
        this.Destroys = new PawnTypes[0];
        this.Destroyed = new[] { PawnTypes.BATTLESHIP, PawnTypes.MISSILE, PawnTypes.CRUISER, PawnTypes.DESTROYER, PawnTypes.SUBMARINE, PawnTypes.ESCORT, PawnTypes.MINESWEEPER, PawnTypes.BATTERY, PawnTypes.MINE };
    }
}