import Axios from "@/config/axios-config";
import { UserInterface } from "@/types/auth";

export interface UserAuthInterface {
  email: string;
  password: string;
}

export class AuthenticateService {
  static async registerUser(body: UserInterface) {
    return await Axios.post("/auth/registration", body);
  }
  static async authenticateUser(body: UserAuthInterface) {
    return await Axios.post("/auth/authenticate");
  }
}
