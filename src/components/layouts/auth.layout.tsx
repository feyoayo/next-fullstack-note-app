import React, { useEffect } from "react";
import { TOKEN_LOCALSTORAGE_KEY } from "@/utils/constants";
import { useRouter } from "next/router";
import HeaderComponent from "@/components/ui/headers/header.component";
import { LayoutProps } from "@/types/util";
import { ROUTES } from "@/utils/constants/routes";

const AuthLayout = ({ children }: LayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
    if (token) {
      router.push(ROUTES.HOME_PAGE).catch((e) => console.log(e));
    }
  }, [router]);
  return (
    <div className={"h-[100vh] dark:bg-black"}>
      <HeaderComponent />
      {children}
    </div>
  );
};

export default AuthLayout;
