export default {

    storeToken(token) {
        localStorage.setItem("auth", JSON.stringify(token));
        this.onChange(true);
    },

    deleteToken() {
        Reflect.deleteProperty(localStorage, "auth");
        this.onChange(false);
    },

    getToken () {
        return JSON.parse(localStorage.getItem("auth"))
    },

    isAuthorized() {
        return Boolean(localStorage.auth);
    },

    // eslint-disable-next-line no-empty-function
    onChange() {}
}
