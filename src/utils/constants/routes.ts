export const ROUTES = {
  HOME_PAGE: "/",
  LOGIN_PAGE: "/auth/login",
  REGISTRATION_PAGE: "/auth/registration",
  ABOUT_PAGE: "/about",
  CONTACT_PAGE: "/contact",
  TASKS_PAGE: "/tasks",
  TASK_PAGE: (id: string) => `/tasks/${id}`,
  NOTE_PAGE: "/notes",
};
