export default {

    storeToken(token) {
        localStorage.setItem('auth', JSON.stringify(token));
    },

    deleteToken() {
        Reflect.deleteProperty(localStorage, 'auth');
    },

    getToken () {
        return JSON.parse(localStorage.getItem('auth'))
    },

    isAuthorized() {
        return Boolean(localStorage.auth);
    }
}
