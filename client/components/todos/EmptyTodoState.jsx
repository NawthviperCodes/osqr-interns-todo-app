import Heading from "../typography/Heading.jsx";
import Text from "../typography/Text.jsx";

export default function EmptyTodoState() {
  return (
    <div className="empty-state">
      <Heading level={3}>No tasks yet</Heading>
      <Text>Add your first task above to start organizing your day.</Text>
    </div>
  );
}
