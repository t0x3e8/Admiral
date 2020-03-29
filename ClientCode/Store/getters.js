import _ from "underscore"

export default {
  isPlayerAuthorized: state => !_.isEmpty(state.player)
}
