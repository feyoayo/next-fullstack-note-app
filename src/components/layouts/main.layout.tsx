import HeaderComponent from "@/components/ui/headers/header.component";
import SidebarComponent from "@/components/ui/sidebar/sidebar.component";
import { LayoutProps } from "@/types/util";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className={"h-screen"}>
      <HeaderComponent />
      <div className={"flex"}>
        <SidebarComponent />

        <section className={"w-full pt-6 px-2 md:px-5 box-border"}>
          {children}
        </section>
      </div>
    </div>
  );
};

export default MainLayout;
