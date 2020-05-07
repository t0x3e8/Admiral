/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
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
      const okStatus = 201,
        responseNewGame = await axios.post(
          "/api/games",
          {
            name: gameName
          },
          this.getAxiosConfig()
        );

      if (responseNewGame.status === okStatus) {
        const responseNewPlayer = await axios.post(
          `/api/games/${responseNewGame.data.id}/players`,
          {
            id: player.id,
            name: player.name
          },
          this.getAxiosConfig()
        );

        if (responseNewPlayer.status === okStatus) {
          const responseNewPawns = await axios.post(
            `/api/games/${responseNewGame.data.id}/players/${responseNewPlayer.data.id}/pawns`,
            pawns,
            this.getAxiosConfig()
          );

          if (responseNewPawns.status === okStatus) {
            return {
              game: responseNewGame.data,
              player: responseNewPlayer.data,
              pawns: responseNewPawns.data
            };
          }
        }
      }

      return null;
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Posting new game error: ${error}`;

      console.error(errMessage);

      return null;
    }
  },

  async joinGame(gameId, pawns, player) {
    axios.interceptors.request.use((request) => {
      console.log(request);

      return request;
    });
    axios.interceptors.response.use((response) => {
      console.log(response);

      return response;
    });

    try {
      const okGetStatus = 200,
        okPostStatus = 201,
        responseNewGame = await axios.get(`/api/games/${gameId}`, this.getAxiosConfig());

      if (responseNewGame.status === okGetStatus) {
        const responseNewPlayer = await axios.post(
          `/api/games/${responseNewGame.data.id}/players`,
          {
            id: player.id,
            name: player.name
          },
          this.getAxiosConfig()
        );

        if (responseNewPlayer.status === okPostStatus) {
          const responseNewPawns = await axios.post(
            `/api/games/${responseNewGame.data.id}/players/${responseNewPlayer.data.id}/pawns`,
            pawns,
            this.getAxiosConfig()
          );

          if (responseNewPawns.status === okPostStatus) {
            return {
              game: responseNewGame.data,
              player: responseNewPlayer.data,
              pawns: responseNewPawns.data
            };
          }
        }
      }

      return null;
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Posting new game error: ${error}`;

      console.error(errMessage);

      return null;
    }
  },

  async getGame(gameId) {
    axios.interceptors.request.use((request) => {
      console.log(request);

      return request;
    });
    axios.interceptors.response.use((response) => {
      console.log(response);

      return response;
    });

    console.log("getGame");

    try {
      const gameData = {},
            okGetStatus = 200,
            resGame = await axios.get(`/api/games/${gameId}`, this.getAxiosConfig());

      if (resGame.status === okGetStatus) {
        gameData.gameId = gameId;
        gameData.players = [];

        for (const player of resGame.data.players) {
          // eslint-disable-next-line no-await-in-loop
          const pawns = await this.getPlayerPawns(gameId, player.id);

          gameData.players.push({
            id: player.id,
            name: player.name,
            pawns
          })
        };
      }

      return gameData;
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Getting new game error: ${error}`;

      console.error(errMessage);

      return null;
    }
  },

  async getPlayerPawns(gameId, playerId) {
    const okGetStatus = 200,
      resPawns = await axios.get(`/api/games/${gameId}/players/${playerId}/pawns`, this.getAxiosConfig());

    if (resPawns.status === okGetStatus) {
      return resPawns.data;
    }

    return null;
  }
};
