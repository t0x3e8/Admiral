import axios from "axios";
import store from "./index.js";

export default {
  getAxiosConfig() {
    return {
      headers: { Authorization: `Bearer ${store.state.player.token}` }
    };
  },

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
      const response = await axios.get("/api/games", this.getAxiosConfig());

      return response.data;
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Getting all games error: ${error}`;

      console.error(errMessage);

      return null;
    }
  }
};
