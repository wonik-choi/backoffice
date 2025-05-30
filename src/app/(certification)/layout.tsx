import NavigationSidebar from '@/widgets/navigation/ui/NavigationSidebar';

import { SidebarProvider, SidebarTrigger } from '@/shared/components/atomics/sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full">
      <SidebarProvider>
        <NavigationSidebar />
        <SidebarTrigger className="sticky top-[1rem] ml-[2rem] mt-[2rem]" />
        <main className="size-full py-[3rem] px-[3rem]">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
