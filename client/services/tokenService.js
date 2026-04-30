const tokenService = {
  getToken() {
    return localStorage.getItem("token") || "";
  },

  saveToken(token) {
    localStorage.setItem("token", token);
  },

  removeToken() {
    localStorage.removeItem("token");
  }
};
