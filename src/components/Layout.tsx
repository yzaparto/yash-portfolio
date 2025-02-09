
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <main className="ml-48 p-12 max-w-2xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;
