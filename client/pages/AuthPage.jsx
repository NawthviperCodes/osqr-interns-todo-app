function AuthPage({ authMode, message, onChangeMode, onLogin, onRegister }) {
  return (
    <PageContainer variant="auth-container">
      <Heading>Todo App</Heading>
      <Text className="subtitle">Organize your tasks, meet deadlines, and focus on what matters.</Text>

      <AuthToggle authMode={authMode} onChangeMode={onChangeMode} />

      {authMode === "login" ? (
        <LoginForm onLogin={onLogin} />
      ) : (
        <RegisterForm onRegister={onRegister} />
      )}

      <ErrorText>{message}</ErrorText>
    </PageContainer>
  );
}
