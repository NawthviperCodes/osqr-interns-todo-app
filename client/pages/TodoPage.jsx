import AppHeader from "../components/layout/AppHeader.jsx";
import PageContainer from "../components/layout/PageContainer.jsx";
import TodoForm from "../components/todos/TodoForm.jsx";
import TodoList from "../components/todos/TodoList.jsx";
import ErrorText from "../components/typography/ErrorText.jsx";
import Heading from "../components/typography/Heading.jsx";

export default function TodoPage({
  currentUser,
  todos,
  message,
  editingId,
  editingTitle,
  onLogout,
  onAddTodo,
  onToggleComplete,
  onStartEditing,
  onChangeEditingTitle,
  onSaveEdit,
  onCancelEditing,
  onDeleteTodo
}) {
  return (
    <PageContainer>
      <AppHeader currentUser={currentUser} onLogout={onLogout} />

      <TodoForm onAddTodo={onAddTodo} />

      <ErrorText>{message}</ErrorText>

      <section className="tasks-section">
        <Heading level={2}>Your Tasks</Heading>

        <TodoList
          todos={todos}
          editingId={editingId}
          editingTitle={editingTitle}
          onToggleComplete={onToggleComplete}
          onStartEditing={onStartEditing}
          onChangeEditingTitle={onChangeEditingTitle}
          onSaveEdit={onSaveEdit}
          onCancelEditing={onCancelEditing}
          onDeleteTodo={onDeleteTodo}
        />
      </section>
    </PageContainer>
  );
}
