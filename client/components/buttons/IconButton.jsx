export default function IconButton({ children, label, variant = "secondary", onClick }) {
  return (
    <button
      type="button"
      className={`icon-button button-${variant}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}
