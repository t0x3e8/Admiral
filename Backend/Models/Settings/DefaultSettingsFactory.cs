public class DefaultSettingsFactory
{
    public GameSettings GetSettings()
    {
        GameSettings settings = new GameSettings
        {
            BoardSettings = null,
            GameStates = new[] { GameState.NotStarted, GameState.Started, GameState.Ended },
            MovesPerTurn = 1,
            Name = "defaultgamesettings",
            PawnMetadatas = new PawnMetadata[] { 
                new BattleshipMetadata(), 
                new BatteryMetadata() 
            }
        };

        return settings;
    }
}