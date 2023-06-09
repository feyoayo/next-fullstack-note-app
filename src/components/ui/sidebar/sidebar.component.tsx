import useSidebarStore from "@/stores/sidebar";
import { ROUTES } from "@/utils/constants/routes";
import classNames from "classnames";
import Link from "next/link";

const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    linkTo: ROUTES.HOME_PAGE,
  },
  {
    id: 2,
    title: "Task list",
    linkTo: ROUTES.TASKS_PAGE,
  },
];
const SidebarComponent = () => {
  const { isOpened } = useSidebarStore();

  return (
    <aside
      id="default-sidebar"
      className={classNames(
        "fixed lg:static top-[70px] left-0 z-40 w-ful h-full md:w-64  box-border transition-transform -translate-x-full translate-x-0",
        {
          ["hidden"]: !isOpened,
        }
      )}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.linkTo}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarComponent;
