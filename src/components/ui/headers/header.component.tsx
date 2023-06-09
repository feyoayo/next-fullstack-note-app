import React from "react";
import Link from "next/link";

import DarkModeSwitcher from "@/components/ui/dark-mode-switcher";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { ROUTES } from "@/utils/constants/routes";
import BurgerButtonComponent from "@/components/ui/buttons/burger-button.component";
import useSidebarStore from "@/stores/sidebar";

const HeaderComponent = () => {
  const router = useRouter();

  const isRegistrationPage = router.pathname === ROUTES.REGISTRATION_PAGE;
  const isLoginPage = router.pathname === ROUTES.LOGIN_PAGE;

  const { toggleSidebar } = useSidebarStore();

  return (
    <nav className="bg-white h-[80px] border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className={"flex items-center gap-2"}>
          <BurgerButtonComponent onClick={toggleSidebar} />
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
        </div>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href={ROUTES.HOME_PAGE}
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.ABOUT_PAGE}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.CONTACT_PAGE}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>
            {isLoginPage ? (
              <li>
                <Link
                  href={ROUTES.REGISTRATION_PAGE}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign Up
                </Link>
              </li>
            ) : isRegistrationPage ? (
              <li>
                <Link
                  href={ROUTES.LOGIN_PAGE}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign In
                </Link>
              </li>
            ) : (
              <li>
                <span
                  onClick={() => signOut({ callbackUrl: ROUTES.LOGIN_PAGE })}
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign Out
                </span>
              </li>
            )}

            <li>
              <div className={"py-1 pl-2"}>
                <DarkModeSwitcher />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
