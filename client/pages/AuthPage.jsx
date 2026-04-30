import AuthToggle from "../components/auth/AuthToggle.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";
import RegisterForm from "../components/auth/RegisterForm.jsx";
import PageContainer from "../components/layout/PageContainer.jsx";
import ErrorText from "../components/typography/ErrorText.jsx";
import Heading from "../components/typography/Heading.jsx";
import Text from "../components/typography/Text.jsx";

export default function AuthPage({ authMode, message, onChangeMode, onLogin, onRegister }) {
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
