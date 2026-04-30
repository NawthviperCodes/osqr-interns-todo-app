import React from "react";
import AuthPage from "../pages/AuthPage.jsx";
import TodoPage from "../pages/TodoPage.jsx";
import useAuth from "../hooks/useAuth.js";
import useTodos from "../hooks/useTodos.js";

export default function TodoApp() {
  const [authMode, setAuthMode] = React.useState("login");
  const [message, setMessage] = React.useState("");
  const [editingId, setEditingId] = React.useState(null);
  const [editingTitle, setEditingTitle] = React.useState("");

  const { token, currentUser, login, register, logout } = useAuth();
  const { todos, addTodo, updateTodo, deleteTodo, clearTodos } = useTodos(token, currentUser);

  async function handleRegister(name, email, password) {
    if (!name || !email || !password) {
      setMessage("Please complete all register fields.");
      return;
    }

    try {
      await register(name, email, password);
      setAuthMode("login");
      setMessage("Account created. You can log in now.");
    } catch (error) {
      setMessage(error.message || "Could not create account.");
    }
  }

  async function handleLogin(email, password) {
    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      const user = await login(email, password);
      setMessage(`Welcome, ${user.name}`);
    } catch (error) {
      setMessage(error.message || "Could not log in.");
    }
  }

  async function handleLogout() {
    await logout();
    clearTodos();
    setEditingId(null);
    setEditingTitle("");
    setMessage("You have been logged out.");
  }

  async function handleAddTodo(title) {
    if (!title) {
      setMessage("Please enter a task title.");
      return;
    }

    try {
      await addTodo(title);
      setMessage("Task added successfully.");
    } catch (error) {
      setMessage(error.message || "Could not add task.");
    }
  }

  async function handleToggleComplete(todo, completed) {
    try {
      await updateTodo(todo._id, {
        title: todo.title,
        completed
      });
      setMessage(completed ? "Task marked as complete." : "Task marked as active.");
    } catch (error) {
      setMessage(error.message || "Could not update task.");
    }
  }

  function handleStartEditing(todo) {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  }

  function handleCancelEditing() {
    setEditingId(null);
    setEditingTitle("");
  }

  async function handleSaveEdit(todo) {
    const cleanTitle = editingTitle.trim();

    if (!cleanTitle) {
      setMessage("Task title cannot be empty.");
      return;
    }

    try {
      await updateTodo(todo._id, {
        title: cleanTitle,
        completed: todo.completed
      });
      setEditingId(null);
      setEditingTitle("");
      setMessage("Task updated successfully.");
    } catch (error) {
      setMessage(error.message || "Could not update task.");
    }
  }

  async function handleDeleteTodo(id) {
    try {
      await deleteTodo(id);
      setMessage("Task deleted successfully.");
    } catch (error) {
      setMessage(error.message || "Could not delete task.");
    }
  }

  return currentUser ? (
    <TodoPage
      currentUser={currentUser}
      todos={todos}
      message={message}
      editingId={editingId}
      editingTitle={editingTitle}
      onLogout={handleLogout}
      onAddTodo={handleAddTodo}
      onToggleComplete={handleToggleComplete}
      onStartEditing={handleStartEditing}
      onChangeEditingTitle={setEditingTitle}
      onSaveEdit={handleSaveEdit}
      onCancelEditing={handleCancelEditing}
      onDeleteTodo={handleDeleteTodo}
    />
  ) : (
    <AuthPage
      authMode={authMode}
      message={message}
      onChangeMode={setAuthMode}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
}
