/**
 * Reset the state
 * @return {object} Initial state
 */
const initialState = function() {
  return {
    player: {},
    games: [],
    activeGame: {},
    recentOpenedGameId: null
  };
};

export default {
  initialState,
  player: {},
  games: [],
  activeGame: {},
  recentOpenedGameId: null
};
