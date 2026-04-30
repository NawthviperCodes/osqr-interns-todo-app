export default function PageContainer({ children, variant = "" }) {
  return <main className={`container ${variant}`.trim()}>{children}</main>;
}
