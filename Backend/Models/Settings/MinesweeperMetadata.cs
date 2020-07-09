public class MinesweeperMetadata : PawnMetadata
{
    public MinesweeperMetadata()
    {
        this.PawnType = PawnTypes.MINESWEEPER;
        this.Name = "Minesweeper";
        this.MediaName = "minesweeper.svg";
        this.Range = 2;
        this.FleetSize = 4;
        this.Destroys = new[] { PawnTypes.MINESWEEPER, PawnTypes.LANDINGSHIP };
        this.Destroyed = new[] { PawnTypes.MINESWEEPER, PawnTypes.BATTLESHIP, PawnTypes.MISSILE, PawnTypes.CRUISER, PawnTypes.DESTROYER, PawnTypes.SUBMARINE, PawnTypes.ESCORT, PawnTypes.BATTERY, PawnTypes.MINE };
    }
}