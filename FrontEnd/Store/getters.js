import _ from "underscore";

export default {
  isPlayerAuthorized: (state) => !_.isEmpty(state.player),

  getAuthToken: (state) => state.player.token
};
