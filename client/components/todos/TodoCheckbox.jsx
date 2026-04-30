export default function TodoCheckbox({ checked, onChange }) {
  return (
    <input
      type="checkbox"
      className="todo-checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}
