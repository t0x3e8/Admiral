The table shows the change of the game state during events such as player joins, committing turns etc. 
The state of the game is determined by the state of two variables: ActivePlayer, Status

|------------------------------|---------------------------|--------|
| Event                        | ActivePlayer              | Status |
|------------------------------|---------------------------|--------|
| Player 1st Joins the game    | Player1st_GUID            | 0      |
| Player 2nd Joins the game    | Player1st_GUID            | 1      |
| Player 1st Commits the turn  | Player2nd_GUID            | 1      |
| Player 2nd Commits the turn  | Player1st_GUID            | 1      |
| .....                        | ....                      | ....   |
| Player 1st Leaves the game   | (last active player)_GUID | 2      |
| PLayer 2nd re-joing the game | (last active player)_GUID | 1      |
| .....                        | ....                      | ....   |
| Game older then 24h          | null                      | 4      |
| Player 1st wins game         | Player1st_GUID            | 4      |
| Player 2nd wins game         | Player2nd_GUID            | 4      |
|------------------------------|---------------------------|--------|