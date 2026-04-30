function useAuth() {
  const [token, setToken] = React.useState(tokenService.getToken());
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    if (token) {
      loadCurrentUser();
    }
  }, [token]);

  async function loadCurrentUser() {
    try {
      const data = await authService.getCurrentUser(token);
      setCurrentUser(data.user);
      return data.user;
    } catch (error) {
      tokenService.removeToken();
      setToken("");
      setCurrentUser(null);
      throw error;
    }
  }

  async function login(email, password) {
    const data = await authService.login({ email, password });
    tokenService.saveToken(data.token);
    setToken(data.token);
    setCurrentUser(data.user);
    return data.user;
  }

  async function register(name, email, password) {
    return authService.register({ name, email, password });
  }

  async function logout() {
    if (token) {
      try {
        await authService.logout(token);
      } catch (error) {
        // The user should still be logged out locally if the server call fails.
      }
    }

    tokenService.removeToken();
    setToken("");
    setCurrentUser(null);
  }

  return {
    token,
    currentUser,
    login,
    register,
    logout
  };
}
