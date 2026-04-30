function useTodos(token, currentUser) {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    if (currentUser) {
      loadTodos();
    } else {
      setTodos([]);
    }
  }, [currentUser]);

  async function loadTodos() {
    const data = await todoService.getTodos(token);
    setTodos(data);
  }

  async function addTodo(title) {
    await todoService.createTodo(token, title);
    await loadTodos();
  }

  async function updateTodo(id, todoData) {
    await todoService.updateTodo(token, id, todoData);
    await loadTodos();
  }

  async function deleteTodo(id) {
    await todoService.deleteTodo(token, id);
    await loadTodos();
  }

  function clearTodos() {
    setTodos([]);
  }

  return {
    todos,
    loadTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    clearTodos
  };
}
