export const CombatResult = {
    DEFENDER_AND_ATTACKER_LOSE: 0,
    ATTACKER_WINS: 1,
    DEFENDER_WINS: -1
  },
  GameState = {
    NOT_STARTED: 0,
    STARTED: 1,
    WAITING: 2,
    TURN: 3,
    ENDED: 4
  },
  CellType = {
    PLAYER_ONE_PORT: 1,
    PLAYER_TWO_PORT: 2,
    PLAYER_ONE_ENTRANCE: 3,
    PLAYER_TWO_ENTRANCE: 4,
    NEUTRAL: 5,
    SEA: 0
  },
  PawnType = {
    BATTERIES: "batteries",
    BATTLESHIP: "battleship",
    CRUISER: "cruiser",
    DESTROYER: "destroyer",
    ESCORTSHIP: "escortship",
    FRIGATE: "frigate",
    LANDINGCRAFT: "landingcraft",
    MINE: "mine",
    MINESWEEPER: "minesweeper",
    SUBMARINE: "submarine"
  },
  HistoryType = {
    PLAYER_JOINS: 1,
    PLAYER_LEAVES: 2,
    GAME_STARTED: 10,
    GAME_STOPPED: 11,
    GAME_CREATED: 20,
    GAME_DESTOYED: 21
  }
