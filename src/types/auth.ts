
export type ROLES = "ADMIN" | "USER"

export interface UserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: ROLES
}

export interface UserAuthInterface {
  email: string;
  password: string;
}