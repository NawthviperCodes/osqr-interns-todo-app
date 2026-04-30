import Button from "../buttons/Button.jsx";
import Heading from "../typography/Heading.jsx";
import Text from "../typography/Text.jsx";

export default function AppHeader({ currentUser, onLogout }) {
  return (
    <div className="header-row">
      <div>
        <Heading>Todo App</Heading>
        <Text className="subtitle">Plan your day clearly and finish work with confidence.</Text>
        <Text className="user-label">Logged in as {currentUser.name}</Text>
      </div>

      <Button variant="ghost" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}
