public abstract class PawnMetadata
{
    public PawnTypes PawnType { get; set; }
    public string Name { get; set; }
    public string MediaName { get; set; }
    public int Range { get; set; }
    public PawnTypes [] Destroys { get; set; }
    public PawnTypes [] Destroyed { get; set; }
    public int FleetSize { get; set; }
 }