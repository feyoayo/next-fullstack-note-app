import Axios from "@/config/axios-config";
import {UserAuthInterface, UserInterface} from "@/types/auth";



export class AuthenticateService {
  static async registerUser(body: UserInterface) {
    return await Axios.post("/auth/registration", body);
  }
  static async authenticateUser(body: UserAuthInterface) {
    return await Axios.post<{token: string}>("/auth/login", body);
  }
}
