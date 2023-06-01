import mongoose, { Mongoose } from "mongoose";

export class DbConnectionService {
  public db: Mongoose;
  private readonly userName: string = "admin";
  private readonly password: string = "Ns1UwGCgHrPY2grD";
  constructor() {
    this.db = mongoose;
  }
  public async disconnectFromDb() {
    await this.db.disconnect();
  }
  public async connectToDb() {
    try {
      await this.db.connect(
        `mongodb+srv://${this.userName}:${this.password}@mean.j8hqeog.mongodb.net/next-fullstack-app`
      );
      console.log("DB connected successfully");
    } catch (e) {
      console.log("DB connection unsuccessfull");

      console.log(e);
    }
  }
}
