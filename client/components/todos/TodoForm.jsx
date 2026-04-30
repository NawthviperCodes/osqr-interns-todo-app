function TodoForm({ onAddTodo }) {
  const [title, setTitle] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAddTodo(title.trim());
    setTitle("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <Button type="submit">Add Task</Button>
    </form>
  );
}
