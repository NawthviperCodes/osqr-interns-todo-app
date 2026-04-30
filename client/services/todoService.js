export const apiService = {
  authHeaders(token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
  },

  async handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  }
};

const todoService = {
  async getTodos(token) {
    const response = await fetch("/api/todos", {
      headers: apiService.authHeaders(token)
    });

    return apiService.handleResponse(response);
  },

  async createTodo(token, title) {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: apiService.authHeaders(token),
      body: JSON.stringify({ title })
    });

    return apiService.handleResponse(response);
  },

  async updateTodo(token, id, todoData) {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: apiService.authHeaders(token),
      body: JSON.stringify(todoData)
    });

    return apiService.handleResponse(response);
  },

  async deleteTodo(token, id) {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: apiService.authHeaders(token)
    });

    return apiService.handleResponse(response);
  }
};

export default todoService;
