import axios from "axios";
import store from "./index.js";

export default {
  getAxiosConfig() {
    return {
      headers: {
        Authorization: `Bearer ${store.state.player.token}`
      }
    };
  },

  async authenticatePlayer(playerName) {
    try {
      const response = await axios.post("/api/players/authenticate", {
        name: playerName
      });

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
  },

  async addGame(gameName, pawns, player) {
    axios.interceptors.request.use((request) => {
      console.log(request);

      return request;
    });
    axios.interceptors.response.use((response) => {
      console.log(response);

      return response;
    });

    try {
      const createdStatus = 201,
        response = await axios.post(
          "/api/games",
          {
            name: gameName,
            pawns,
            players: [player]
          },
          this.getAxiosConfig()
        );

      if (response.status === createdStatus) {
        return response.data;
      }

      return null;
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Posting new game error: ${error}`;

      console.error(errMessage);

      return null;
    }
  }
};
