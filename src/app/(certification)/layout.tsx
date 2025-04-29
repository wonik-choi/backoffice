import NavigationList from '@/widgets/navigation/ui/NavigationList';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto py-10">
      <NavigationList />
      {children}
    </div>
  );
};

export default Layout;
