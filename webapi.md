| url                                            | method  | description                                                          | StatusCode | Impl.?/UnitTest? |
|------------------------------------------------|---------|----------------------------------------------------------------------|------------|------------------|
| api/games/                                     | GET     | Returns collection of all Game-s including Player-s                  | 200        | Yes/Yes          |
| api/games/                                     | OPTIONS | Returns information about available methods for the resource         | 200        | Yes/No           |
| api/games/                                     | POST    | Creates a new Game without Player and Pawn                           | 201        | Yes/Yes          |
| api/games/gameId                               | GET     | Returns a Game specified by Id                                       | 200        | Yes/Yes          |
| api/games/gameId                               | PATCH   | Updates the Game entity (exluding other resources i.e. Player, Pawn) | 204        | No               |
| api/games/gameId/players                       | GET     | Returns collection of all Player-s                                   | 200        | Yes/Yes          |
| api/games/gameId/players                       | POST    | Creates a new Player                                                 | 201        | Yes/Yes          |
| api/games/gameId/players/playerId              | GET     | Returns a Player specified by Id                                     | 200        | Yes/Yes          |
| api/games/gameId/players/playerId              | PATCH   | Updates the Player entity                                            | 204        | No               |
| api/games/gameId/players/playerId/pawns        | GET     | Returns collection of all Pawn-s                                     | 200        | Yes/Yes          |
| api/games/gameId/players/playerId/pawns        | POST    | Creates new Pawn's collection                                        | 204        | Yes/Yes          |
| api/games/gameId/players/playerId/pawns/pawnId | GET     | Returns a Pawn specified by Id                                       | 200        | No               |
| api/games/gameId/players/playerId/pawns/pawnId | PATCH   | Updates the Pawn entity                                              | 204        | Yes/Yes          |
| api/players/authenticate                       | POST    | Returns Player with authorization Token                              | 200        | Yes/No           |