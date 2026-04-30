const authService = {
  async register({ name, email, password }) {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    return apiService.handleResponse(response);
  },

  async login({ email, password }) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    return apiService.handleResponse(response);
  },

  async getCurrentUser(token) {
    const response = await fetch("/api/me", {
      headers: apiService.authHeaders(token)
    });

    return apiService.handleResponse(response);
  },

  async logout(token) {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: apiService.authHeaders(token)
    });

    return apiService.handleResponse(response);
  }
};
