import { DbConnectionService } from "./db-connection.service";

export class UserService {
  client: DbConnectionService;

  constructor() {
    this.client = new DbConnectionService();
  }

  async getUsers() {
    await this.client.connectToDb();
    const users = await this.client.db.user.findMany();
    await this.client.disconnectFromDb();
    return users;
  }
  async createUser(email: string, name: string) {
    await this.client.connectToDb();
    const user = await this.client.db.user.create({
      data: {
        email,
        name,
      },
    });
    await this.client.disconnectFromDb();
    return user;
  }
}
