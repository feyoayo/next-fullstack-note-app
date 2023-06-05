import React from "react";
import { LayoutProps } from "@/types/util";
import HeaderComponent from "@/components/ui/headers/header.component";
import SidebarComponent from "@/components/ui/sidebar/sidebar.component";
const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <HeaderComponent />

      <div className={"flex"}>
        <SidebarComponent />

        <section className={"w-full pt-6"}>{children}</section>
      </div>
    </div>
  );
};

export default MainLayout;
