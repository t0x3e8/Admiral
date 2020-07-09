public class GameSettings
{
    public string Name { get; set; }

    public GameState[] GameStates;

    public PawnMetadata[] PawnMetadatas;

    public int MovesPerTurn;
    
    public object BoardSettings;

    public GameSettings()
    {

    }
}