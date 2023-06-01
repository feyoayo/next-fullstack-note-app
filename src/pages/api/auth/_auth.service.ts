import { UserModel } from "@/models/user.model";
import { UserInterface } from "@/types/auth";
import { compare, genSalt, hash } from "bcryptjs";

export class AuthenticateService {
  private readonly saltAmount: number = 10;
  private async hashPassword(password: string) {
    try {
      const salt = await genSalt(this.saltAmount);
      let hashPassword: string = await hash(password, salt);
      return hashPassword;
    } catch (e) {
      console.log(e);
      return "";
    }
  }
  private async comparePassword(
    hash: string,
    password: string
  ): Promise<boolean> {
    return compare(password, hash);
  }

  private async findUser(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  public async createUser(userData: UserInterface): Promise<UserInterface> {
    const isUserExist = await this.findUser(userData.email);
    if (isUserExist) {
      throw new Error("User already exist");
    }

    userData.password = await this.hashPassword(userData.password);
    const user = new UserModel(userData).save();
    return user;
  }
}
