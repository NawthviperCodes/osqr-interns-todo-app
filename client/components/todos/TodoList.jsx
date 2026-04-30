import EmptyTodoState from "./EmptyTodoState.jsx";
import TodoItem from "./TodoItem.jsx";

export default function TodoList({
  todos,
  editingId,
  editingTitle,
  onToggleComplete,
  onStartEditing,
  onChangeEditingTitle,
  onSaveEdit,
  onCancelEditing,
  onDeleteTodo
}) {
  if (todos.length === 0) {
    return <EmptyTodoState />;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          isEditing={editingId === todo._id}
          editingTitle={editingTitle}
          onToggleComplete={onToggleComplete}
          onStartEditing={onStartEditing}
          onChangeEditingTitle={onChangeEditingTitle}
          onSaveEdit={onSaveEdit}
          onCancelEditing={onCancelEditing}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}
