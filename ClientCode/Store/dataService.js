import axios from "axios";
import store from "./index.js";

export default {
  async authenticatePlayer(playerName) {
    try {
      const response = await axios.post("/api/players/authenticate", { name: playerName });

      return response;
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Player authentication error: ${error}`;

      console.error(errMessage);

      return null;
    }
  },

  async getAllGames() {
    try {
      const authToken = store.getters.getAuthToken,
        response = await axios.get("/api/games", {
          headers: { Authorization: `Bearer ${authToken}` }
        });

      return response.data;
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Getting all games error: ${error}`;

      console.error(errMessage);

      return null;
    }
  }
};
