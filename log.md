| #  | Desc                                                                                    |  Status   |    Date    |
|:--:|-----------------------------------------------------------------------------------------|:---------:|:----------:|
| 19 | Refactor BattleSimulato so does not returns boolean, but instead updates pawn (out/ref) |   ToDo    |            |
| 18 | Game settings to be stored on server side, so battle simulator uses it for battle calc. |   ToDo    |            |
| 17 | Server processes the battle result and returns the updated game data                    |   ToDo    |            |
| 16 | Display 2 Pawns in one cell                                                             |   Done    | 01/10/2020 |
| 15 | Enable posibility to display 2 pawns when one attacks another                           |   Done    | 01/10/2020 |
| 14 | Color pawn when it becomes selected                                                     |   Done    | 16/09/2020 |
| 13 | Use Pawn card to display battle result, when 2 ships battle.                            |   ToDo    |            |
| 12 | Embrace GameControlPanel and PawnCard within Card group                                 |   Done    | 14/09/2020 |
| 11 | Turn GameControlPanel into card                                                         |   Done    | 14/09/2020 |
| 10 | Add "Destroys" and "Is destroyed" icons to the pawn card                                |   Done    | 15/09/2020 |
| 9  | Ensure that the SVG icon on Pawn card is updated, when pawn selection changes           |   Done    | 29/07/2020 |
| 8  | Add Pawn card. When Pawn is selected then card will display range, name, col and Row    |   DOne    | 28/07/2020 |
| 7  | Add RESET TURN button, so the pawn is not moved, and returned to starting posiiton.     |   Done    | 01/09/2020 |
| 6  | Switch "Commit Turn" into "Waiting" when only one player is available.                  |   Done    | 27/07/2020 |
| 5  | When isTurnOpen is false, then pawns of the player cannot be moved.                     |   Done    | 27/07/2020 |
| 4  | Unit test GameStateManager                                                              | Cancelled | 28/07/2020 |
| 3  | Fix "Waiting" button for Game screen. So counter is restarted and it's started over     |   Done    | 27/07/2020 |
| 2  | Rename method isTurnReady to isTurnCompleted in Game, GameControlPanelComponent         |   Done    | 26/07/2020 |
| 1  | Update game's state when first player joins the game.                                   |   Done    | 24/07/2020 |