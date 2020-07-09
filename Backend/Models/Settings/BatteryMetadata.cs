public class BatteryMetadata : PawnMetadata
{
    public BatteryMetadata()
    {
        this.PawnType = PawnTypes.BATTERY;
        this.Name = "Shore Battery";
        this.MediaName = "battery.svg";
        this.Range = 0;
        this.FleetSize = 4;
        this.Destroys = new [] { PawnTypes.BATTLESHIP, PawnTypes.CRUISER, PawnTypes.DESTROYER, PawnTypes.SUBMARINE, PawnTypes.ESCORT, PawnTypes.MINESWEEPER, PawnTypes.LANDINGSHIP };
        this.Destroyed = new[] { PawnTypes.MISSILE};
    }
}