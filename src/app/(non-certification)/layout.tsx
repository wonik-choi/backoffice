const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full max-w-[50rem] mx-auto">
      <main className="size-full">{children}</main>
    </div>
  );
};

export default Layout;
