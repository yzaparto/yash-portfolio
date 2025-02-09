
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <main className={`${isMobile ? 'ml-0 pt-24' : 'ml-48'} p-6 md:p-12 max-w-4xl`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
