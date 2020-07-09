public class MissileshipMetadata : PawnMetadata
{
    public MissileshipMetadata()
    {
        this.PawnType = PawnTypes.MISSILE;
        this.Name = "Missile Ship";
        this.MediaName = "missileship.svg";
        this.Range = 1;
        this.FleetSize = 3;
        this.Destroys = new [] { PawnTypes.MISSILE, PawnTypes.CRUISER, PawnTypes.DESTROYER, PawnTypes.ESCORT, PawnTypes.MINESWEEPER, PawnTypes.LANDINGSHIP, PawnTypes.BATTERY };
        this.Destroyed = new [] { PawnTypes.BATTLESHIP, PawnTypes.SUBMARINE, PawnTypes.MINE, PawnTypes.MISSILE };
    }
}