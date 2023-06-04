import {UserModel} from "@/backend/models/user.model";
import {UserAuthInterface, UserInterface} from "@/types/auth";
import jwt from 'jsonwebtoken'
import {EncryptPassword} from "@/backend/services/encrypt-password.service";

export class AuthenticateService {
  encryptPassword: EncryptPassword

  constructor() {
   this.encryptPassword = new EncryptPassword()
  }


  private async findUser(email: string) {
    return UserModel.findOne({email});
  }

  public async createUser(userData: UserInterface): Promise<UserInterface> {
    const isUserExist = await this.findUser(userData.email);
    if (isUserExist) {
      throw new Error("User already exist");
    }

    userData.password = await this.encryptPassword.hashPassword(userData.password);
    userData.role = 'USER';
    const user = new UserModel(userData).save();
    return user;
  }

  public async authUser(userData: UserAuthInterface): Promise<any> {
    const authCandidate = await this.findUser(userData.email);
    if (!authCandidate) {
      throw new Error("User not exist");
    }

    const isRightPassword = await this.encryptPassword.comparePassword(authCandidate.password, userData.password)

    if(!isRightPassword) {
      throw new Error('Login error')
    }

    const token = jwt.sign({
      userId: authCandidate.id, email: authCandidate.email},
        'SECRET1224', {expiresIn: '1d'}
    )
  return {
      token
  }
  }
}


