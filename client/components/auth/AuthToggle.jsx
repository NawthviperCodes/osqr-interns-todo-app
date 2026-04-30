import Button from "../buttons/Button.jsx";

export default function AuthToggle({ authMode, onChangeMode }) {
  return (
    <div className="auth-tabs">
      <Button
        variant={authMode === "login" ? "primary" : "secondary"}
        onClick={() => onChangeMode("login")}
      >
        Login
      </Button>

      <Button
        variant={authMode === "register" ? "primary" : "secondary"}
        onClick={() => onChangeMode("register")}
      >
        Register
      </Button>
    </div>
  );
}
