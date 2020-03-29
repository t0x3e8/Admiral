import axios from "axios";

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
  }
};
