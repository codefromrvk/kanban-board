export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-secondary p-10 min-h-screen">{children}</div>;
}
