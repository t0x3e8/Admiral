public class BattleshipMetadata : PawnMetadata
{
    public BattleshipMetadata()
    {
        this.PawnType = PawnTypes.BATTLESHIP;
        this.Name = "Battleship";
        this.MediaName = "battleship.svg";
        this.Range = 2;
        this.FleetSize = 3;
        this.Destroys = new [] { PawnTypes.BATTLESHIP, PawnTypes.MISSILE, PawnTypes.CRUISER, PawnTypes.DESTROYER, PawnTypes.ESCORT, PawnTypes.MINESWEEPER, PawnTypes.LANDINGSHIP };
        this.Destroyed = new [] { PawnTypes.BATTLESHIP, PawnTypes.SUBMARINE, PawnTypes.BATTERY, PawnTypes.MINE };
    }
}