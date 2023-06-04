
export type ROLES = "ADMIN" | "USER"
export type AccountTypes = 'credential' | 'google'
export interface UserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: ROLES,
  accountType:AccountTypes
}

export interface UserAuthInterface {
  email: string;
  password: string;
}