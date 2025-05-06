import NavigationSidebar from '@/widgets/navigation/ui/NavigationSidebar';

import { SidebarProvider, SidebarTrigger } from '@/shared/components/atomics/sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full">
      <SidebarProvider>
        <NavigationSidebar />
        <SidebarTrigger className="ml-2 mt-2" />
        <main className="size-full py-10 px-5">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
