export default function Button({ children, type = "button", variant = "primary", onClick, className = "" }) {
  const buttonClassName = `button button-${variant} ${className}`.trim();

  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
}
