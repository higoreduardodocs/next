export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      {children}
    </div>
  );
}
