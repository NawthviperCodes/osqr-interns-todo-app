function Heading({ children, level = 1 }) {
  const TagName = `h${level}`;

  return <TagName className={`heading heading-${level}`}>{children}</TagName>;
}
