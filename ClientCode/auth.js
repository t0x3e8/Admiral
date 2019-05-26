export default {
    storeToken(token) {
        localStorage.token = token
    },

    deleteToken() {
        Reflect.deleteProperty(localStorage, 'token');
    },

    getToken () {
        return localStorage.token
    }
}
