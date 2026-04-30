function Text({ children, className = "" }) {
  return <p className={`text ${className}`.trim()}>{children}</p>;
}
