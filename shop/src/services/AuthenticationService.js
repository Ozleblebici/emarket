import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("/register", credentials);
  },
  login(credentials) {
    return Api().post("/login", credentials);
  },
  user(id) {
    return Api().get(`/user/${id}`);
  },
  validUser(email) {
    return Api().get(`/validUser/${email}`)
  },
  requestToken(credentials) {
    return Api().post("/requestToken", credentials);
  },
  verifyToken(token) {
    return Api().get(`/verifyToken/${token}`);
  },
  resetPassword(credentials) {
    return Api().post("/resetPassword", credentials);
  }
};
