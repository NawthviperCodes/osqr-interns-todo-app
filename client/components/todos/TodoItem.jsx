function TodoItem({
  todo,
  isEditing,
  editingTitle,
  onToggleComplete,
  onStartEditing,
  onChangeEditingTitle,
  onSaveEdit,
  onCancelEditing,
  onDeleteTodo
}) {
  return (
    <li className={todo.completed ? "todo-item completed-item" : "todo-item"}>
      <div className="todo-info">
        <TodoCheckbox checked={todo.completed} onChange={(checked) => onToggleComplete(todo, checked)} />

        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editingTitle}
            onChange={(event) => onChangeEditingTitle(event.target.value)}
          />
        ) : (
          <span className={todo.completed ? "todo-text completed" : "todo-text"}>
            {todo.title}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <React.Fragment>
            <Button variant="success" onClick={() => onSaveEdit(todo)}>
              Save
            </Button>
            <Button variant="secondary" onClick={onCancelEditing}>
              Cancel
            </Button>
          </React.Fragment>
        ) : (
          <Button variant="secondary" onClick={() => onStartEditing(todo)}>
            Edit
          </Button>
        )}

        <Button variant="danger" onClick={() => onDeleteTodo(todo._id)}>
          Delete
        </Button>
      </div>
    </li>
  );
}
