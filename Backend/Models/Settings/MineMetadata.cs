public class MineMetadata : PawnMetadata
{
    public MineMetadata()
    {
        this.PawnType = PawnTypes.MINE;
        this.Name = "Mine";
        this.MediaName = "mine.svg";
        this.Range = 0;
        this.FleetSize = 6;
        this.Destroys = new[] { PawnTypes.BATTLESHIP, PawnTypes.MISSILE, PawnTypes.CRUISER, PawnTypes.DESTROYER, PawnTypes.SUBMARINE, PawnTypes.ESCORT, PawnTypes.LANDINGSHIP };
        this.Destroyed = new[] { PawnTypes.MINESWEEPER };
    }
}